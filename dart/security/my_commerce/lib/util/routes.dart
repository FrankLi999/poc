import 'package:flutter/material.dart';
import 'package:my_commerce/pages/product_detail_page.dart';
import 'package:my_commerce/util/constants.dart';

class Routes {
  static final routes = <String, WidgetBuilder>{
//    "/productDetail": (BuildContext context) =>
    Constants.ROUTE_PRODUCT_DETAIL: (BuildContext context) =>
        ProductDetailPage(),
  };
}
