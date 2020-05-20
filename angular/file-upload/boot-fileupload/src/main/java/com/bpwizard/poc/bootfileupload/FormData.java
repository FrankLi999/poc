package com.bpwizard.poc.bootfileupload;

import java.util.HashMap;
import java.util.Map;

public class FormData {
	private Map<String, Object> data = new HashMap<>();

	public Map<String, Object> getData() {
		return data;
	}

	public void setData(Map<String, Object> data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "FormData [data=" + data + "]";
	}
}
