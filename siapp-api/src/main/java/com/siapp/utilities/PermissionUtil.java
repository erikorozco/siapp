package com.siapp.utilities;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class PermissionUtil {
	
	public static List<HashMap<String, Object>> convertPermissionsArrayToObject(List<Object[]> permissions) {
		List<HashMap<String, Object>> finalResult = new ArrayList<HashMap<String,Object>>();
		HashMap<String, Object> map = null;
		for (Object[] p : permissions) {					
			map = new HashMap<>();
			map.put("name", p[0]);
			map.put("roles", Arrays.asList(p[1].toString().split(":")));
			finalResult.add(map);
		}
		return finalResult;
	}

}
