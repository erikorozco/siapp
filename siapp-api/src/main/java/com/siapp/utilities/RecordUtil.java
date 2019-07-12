package com.siapp.utilities;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class RecordUtil {
	
	public static List<HashMap<String, Object>> convertFindRecordsByTherapistArrayToObject(List<Object[]> records) {
		List<HashMap<String, Object>> finalResult = new ArrayList<HashMap<String,Object>>();
		HashMap<String, Object> map = null;
		for (Object[] el : records) {
			map = new HashMap<>();
			map.put("recordId", el[0]);
			map.put("recordStatus", el[1]);
			map.put("recordPatientName", el[2]);
			map.put("recordPatientLastName", el[3]);
			map.put("recordPatientSecondLastName", el[4]);
			map.put("personId", el[5]);
			finalResult.add(map);
		}
		return finalResult;
	}

}
