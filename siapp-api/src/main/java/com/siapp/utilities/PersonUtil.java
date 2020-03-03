package com.siapp.utilities;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class PersonUtil {

	public static List<HashMap<String, Object>> convertFindAllPersonsArrayToObject(List<Object[]> persons) {
		List<HashMap<String, Object>> finalResult = new ArrayList<HashMap<String,Object>>();
		HashMap<String, Object> map = null;
		for (Object[] el : persons) {					
			map = new HashMap<>();
			map.put("id", el[0]);
			map.put("name", el[1]);
			map.put("lastName", el[2]);
			map.put("secondLastName", el[3]);
			map.put("phone", el[4]);
			map.put("createdAt", el[5]);
			map.put("updatedAt", el[6]);
			map.put("active", el[7]);
			map.put("email", el[8]);
			map.put("recordId", el[9]);
			finalResult.add(map);
		}
		return finalResult;
	}
	
}
