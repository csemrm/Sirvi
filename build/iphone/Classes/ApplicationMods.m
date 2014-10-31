/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2014 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * WARNING: This is generated code. Do not modify. Your changes *will* be lost.
 */

#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];

	
		[modules addObject:[NSDictionary
			dictionaryWithObjectsAndKeys:@"clientmodule",
			@"name",
			@"com.twilio.client",
			@"moduleid",
			@"0.0.1",
			@"version",
			@"7fce7d17-c435-4b1c-830f-7555f22e21a6",
			@"guid",
			@"",
			@"licensekey",
			nil
		]];
		
		[modules addObject:[NSDictionary
			dictionaryWithObjectsAndKeys:@"facebook",
			@"name",
			@"facebook",
			@"moduleid",
			@"3.1.1",
			@"version",
			@"da8acc57-8673-4692-9282-e3c1a21f5d83",
			@"guid",
			@"",
			@"licensekey",
			nil
		]];
		

	return modules;
}

@end