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
			map.put("church", el[7]);
			map.put("serviceType", el[8]);
			map.put("therapistName", el[9]);
			map.put("total", el[10]);
			map.put("status", el[11]);
			finalResult.add(map);
		}
		return finalResult;
	}

}
