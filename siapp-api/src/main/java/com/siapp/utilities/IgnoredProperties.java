package com.siapp.utilities;

import com.siapp.constants.Model;

public class IgnoredProperties {
	
	/**
	 * Return the ignored properties for the given model
	 * @param Enum Model
	 * @return String[]
	 */
	static public String[] getIgnoredProperties(Model model) {
		
		String[] ignoredProperties;
		
		switch (model) {
		case USER:
			ignoredProperties = new String[]{"id", "createdAt", "updatedAt", "therapist"};
			break;
		case THERPIST:			
			ignoredProperties = new String[]{"id", "createdAt", "updatedAt", "user"};
			break;
		case RECORD:
			ignoredProperties = new String[]{"id", "createdAt", "updatedAt", "therapists"};
			break;
		default:
			ignoredProperties = new String[]{"id", "createdAt", "updatedAt"};
		}
		
		return ignoredProperties;
	}
	
}
