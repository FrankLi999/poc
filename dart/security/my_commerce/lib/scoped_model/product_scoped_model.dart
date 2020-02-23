import 'dart:async';
import 'dart:convert';
import 'dart:collection';
import 'package:uuid/uuid.dart';
import 'package:http/http.dart' as http;
import 'package:my_commerce/model/any_image.dart';
import 'package:my_commerce/model/category.dart';

import 'package:my_commerce/model/product.dart';
import 'package:my_commerce/util/remote_config.dart';
import 'package:scoped_model/scoped_model.dart';
import 'package:crypto/crypto.dart';
import 'package:my_commerce/util/oauth_header.dart';
import 'package:my_commerce/util/http_method.dart';
import 'package:my_commerce/util/special_symbol.dart';

class ProductScopedModel extends Model {
  List<Product> _productsList = [];
  bool _isLoading = true;
  bool _hasModeProducts = true;
  int currentProductCount;

  List<Product> get productsList => _productsList;

  bool get isLoading => _isLoading;

  bool get hasMoreProducts => _hasModeProducts;

  void addToProductsList(Product product) {
    _productsList.add(product);
  }

  int getProductsCount() {
    return _productsList.length;
  }

  Future parseProductsFromResponse(int categoryId, int pageIndex) async {
    if (pageIndex == 1) {
      _isLoading = true;
    }
    notifyListeners();
    currentProductCount = 0;
    var dataFromResponse = await _getProductsByCategory(categoryId, pageIndex);

    dataFromResponse.forEach(
      (newProduct) {
        currentProductCount++;

        //parse the product's images
        List<AnyImage> imagesOfProductList = [];

        newProduct["images"].forEach(
          (newImage) {
            imagesOfProductList.add(
              new AnyImage(
                imageURL: newImage["src"],
                id: newImage["id"],
                title: newImage["name"],
                alt: newImage["alt"],
              ),
            );
          },
        );

        //parse the product's categories
        List<Category> categoriesOfProductList = [];

        newProduct["categories"].forEach(
          (newCategory) {
            categoriesOfProductList.add(
              new Category(
                id: newCategory["id"],
                name: newCategory["name"],
              ),
            );
          },
        );

        //parse new product's details
        Product product = new Product(
          productId: newProduct["id"],
          productName: newProduct["name"],
          description: newProduct["description"],
          regularPrice: newProduct["regular_price"],
          salePrice: newProduct["sale_price"],
          stockQuantity: newProduct["stock_quantity"] != null
              ? newProduct["stock_quantity"]
              : 0,
          ifItemAvailable: (newProduct["on_sale"] ?? false) &&
              (newProduct["purchasable"] ?? false) &&
              (newProduct["in_stock"] ?? false),
          // ifItemAvailable: false,
          discount: ((((int.parse(newProduct["regular_price"]) -
                          int.parse(newProduct["sale_price"])) /
                      (int.parse(newProduct["regular_price"]))) *
                  100))
              .round(),
          images: imagesOfProductList,
          categories: categoriesOfProductList,
        );

        addToProductsList(product);
      },
    );

    if (pageIndex == 1) _isLoading = false;

    if (currentProductCount < 6) {
      _hasModeProducts = false;
    }

    notifyListeners();
  }

  Future<dynamic> _getProductsByCategory(categoryId, pageIndex) async {
    String url =
        '${RemoteConfig.config["BASE_URL"]}${RemoteConfig.config["BASE_PRODUCTS_URL"]}';
    Map<String, String> params = {
      'category': categoryId.toString(),
      'page': pageIndex.toString()
    };
    String signature = _getAsQueryString(url, params, HttpMethod.GET);
    var response = await http.get(url + "?" + signature).catchError(
      (error) {
        return false;
      },
    );
    return json.decode(response.body);
  }

  String _getAsQueryString(
      String endpoint, Map<String, String> params, String httpMetod) {
    Map<String, String> oauthParameters =
        _getAsMap(endpoint, params, httpMetod);
    String encodedSignature = oauthParameters[OAuthHeader.OAUTH_SIGNATURE]
        .replaceAll(SpecialSymbol.PLUS.plain, SpecialSymbol.PLUS.encoded);
    oauthParameters[OAuthHeader.OAUTH_SIGNATURE] = encodedSignature;
    return _mapToString(
        oauthParameters, SpecialSymbol.EQUAL.plain, SpecialSymbol.AMP.plain);
  }

  Map<String, String> _getAsMap(
      String endpoint, Map<String, String> params, String httpMethod) {
    Map<String, String> authParams = Map();
    authParams[OAuthHeader.OAUTH_CONSUMER_KEY] =
        RemoteConfig.config["CUSTOMER_KEY"];
    authParams[OAuthHeader.OAUTH_TIMESTAMP] =
        (new DateTime.now().millisecondsSinceEpoch ~/ 1000).toString();
    authParams[OAuthHeader.OAUTH_NONCE] = Uuid().v1();
    authParams[OAuthHeader.OAUTH_SIGNATURE_METHOD] =
        RemoteConfig.config["SIGNATURE_METHOD_HMAC_SHA256"];
    authParams.addAll(params);

    // WooCommerce specified param
    if (httpMethod == HttpMethod.DELETE) {
      authParams[OAuthHeader.DELETE_PARAM_FORCE] = true.toString();
    }
    String oAuthSignature = _generateOAuthSignature(
        RemoteConfig.config["CUSTOMER_SECRET"],
        endpoint,
        httpMethod,
        authParams);
    authParams[OAuthHeader.OAUTH_SIGNATURE] = oAuthSignature;
    return authParams;
  }

  String _mapToString(Map<String, String> paramsMap, String keyValueDelimiter,
      String paramsDelimiter) {
    List<String> params = List();
    paramsMap.forEach((key, value) {
      params.add(key + keyValueDelimiter + value);
    });
    String mapToString = params.join(paramsDelimiter);
    return mapToString;
  }

  String _generateOAuthSignature(String customerSecret, String endpoint,
      String httpMethod, Map<String, String> parameters) {
    String signatureBaseString =
        _getSignatureBaseString(endpoint, httpMethod, parameters);
    // v1, v2
    String secret = customerSecret + SpecialSymbol.AMP.plain;
    return _signBaseString(secret, signatureBaseString);
  }

  String _getSignatureBaseString(
      String url, String method, Map<String, String> parameters) {
    String requestURL = Uri.encodeComponent(url);
    // 1. Percent encode every key and value that will be signed.
    Map<String, String> encodedParameters =
        _percentEncodeParameters(parameters);

    // 2. Sort the list of parameters alphabetically by encoded key.
    encodedParameters = _getSortedParameters(encodedParameters);
    String paramsString = _mapToString(encodedParameters,
        SpecialSymbol.EQUAL.encoded, SpecialSymbol.AMP.encoded);
    return method + "&" + requestURL + "&" + paramsString;
  }

  String _signBaseString(String secret, String signatureBaseString) {
    var hmacSha256 = new Hmac(sha256, utf8.encode(secret)); // HMAC-SHA256
    var digest = hmacSha256.convert(utf8.encode(signatureBaseString));
    String signed = base64.encode(digest.bytes);
    return signed;
  }

  Map<String, String> _percentEncodeParameters(Map<String, String> parameters) {
    Map<String, String> encodedParamsMap = Map();
    parameters.forEach((key, value) {
      encodedParamsMap[_percentEncode(key)] = _percentEncode(value);
    });
    return encodedParamsMap;
  }

  Map<String, String> _getSortedParameters(Map<String, String> parameters) {
    SplayTreeMap<String, String> treeMap = SplayTreeMap();
    treeMap.addAll(parameters);
    return treeMap;
  }

  String _percentEncode(String s) {
    return Uri.encodeComponent(s)
        .replaceAll(SpecialSymbol.PLUS.plain, SpecialSymbol.PLUS.encoded)
        .replaceAll(SpecialSymbol.STAR.plain, SpecialSymbol.STAR.encoded)
        .replaceAll(SpecialSymbol.TILDE.plain, SpecialSymbol.TILDE.encoded);
  }
}
