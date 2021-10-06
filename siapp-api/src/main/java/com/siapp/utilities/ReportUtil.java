package com.siapp.utilities;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ReportUtil {
	
	public static List<HashMap<String, Object>> convertGetAllTicketsArrayToObject(List<Object[]> tickets) {
		List<HashMap<String, Object>> finalResult = new ArrayList<HashMap<String,Object>>();
		HashMap<String, Object> map = null;
		for (Object[] el : tickets) {					
			map = new HashMap<>();
			map.put("id", el[0]);
			map.put("date", el[1]);
			map.put("recordId", el[2]);
			map.put("personName", el[3]);
			map.put("age", el[4]);
			map.put("gender", el[5]);
			map.put("location", el[6]);
			map.put("city", el[7]);
			map.put("church", el[8]);
			map.put("serviceType", el[9]);
			map.put("therapistName", el[10]);
			map.put("total", el[11]);
			map.put("status", el[12]);
			finalResult.add(map);
		}
		return finalResult;
	}
	
	public static List<HashMap<String, Object>> convertGetAllOtherTicketsArrayToObject(List<Object[]> tickets) {
		List<HashMap<String, Object>> finalResult = new ArrayList<HashMap<String,Object>>();
		HashMap<String, Object> map = null;
		for (Object[] el : tickets) {
			map = new HashMap<>();
			map.put("id", el[0]);
			map.put("date", el[1]);
			map.put("recordId", "NA");
			map.put("personName", el[2]);
			map.put("age", el[3]);
			map.put("gender", el[4]);
			map.put("location", el[5]);
			map.put("city", el[6]);
			map.put("church", el[7]);
			map.put("serviceType", el[8]);
			map.put("therapistName", "");
			map.put("total", el[9]);
			map.put("status", el[10]);
			finalResult.add(map);
		}
		return finalResult;
	}
	
	public static List<HashMap<String, Object>> convertArrayToObjectList(List<Object[]> items, String[] keys) {
		List<HashMap<String, Object>> finalResult = new ArrayList<HashMap<String,Object>>();
		HashMap<String, Object> map = null;
		for (Object[] el : items) {
			map = new HashMap<>();
			int index = 0;
			for (String key : keys) {				
				map.put(key, el[index++]);
			}
			finalResult.add(map);
		}
		return finalResult;
	}

}
