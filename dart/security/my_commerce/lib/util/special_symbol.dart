class SpecialSymbol {
  final String _plain;
  final String _encoded;
  const SpecialSymbol._internal(this._plain, this._encoded);

  static const FOO = const SpecialSymbol._internal("&", "%26");
  static const SpecialSymbol AMP = const SpecialSymbol._internal("&", "%26");
  static const SpecialSymbol EQUAL = const SpecialSymbol._internal("=", "%3D");
  static const SpecialSymbol PLUS = const SpecialSymbol._internal("+", "%2B");
  static const SpecialSymbol STAR = const SpecialSymbol._internal("*", "%2A");
  static const SpecialSymbol TILDE = const SpecialSymbol._internal("~", "%7E");
  get plain {
    return this._plain;
  }

  get encoded {
    return this._encoded;
  }

  toString() => '$_plain/$_encoded';
}
