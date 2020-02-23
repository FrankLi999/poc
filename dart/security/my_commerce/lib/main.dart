import 'package:flutter/material.dart';
// import 'package:my_commerce/pages/product_detail_page.dart';
import 'package:my_commerce/pages/products_list_page.dart';
import 'package:my_commerce/util/routes.dart';

void main() {
  runApp(
    MaterialApp(
      home: ProductsListPage(),
      routes: Routes.routes,
    ),
  );
}
