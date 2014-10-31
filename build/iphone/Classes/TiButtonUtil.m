/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2014 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#import "TiButtonUtil.h"
#import "TiBase.h"


@implementation TiButtonUtil

+(UIView*)systemButtonWithType:(int)type
{
	switch (type)
	{
		case UISirviNativeItemInfoLight:
		{
			return [UIButton buttonWithType:UIButtonTypeInfoLight];
		}
		case UISirviNativeItemInfoDark:
		{
			return [UIButton buttonWithType:UIButtonTypeInfoDark];
		}
		case UISirviNativeItemDisclosure:
		{
			return [UIButton buttonWithType:UIButtonTypeDetailDisclosure];
		}
		case UISirviNativeItemContactAdd:
		{
			return [UIButton buttonWithType:UIButtonTypeContactAdd];
		}
		case UISirviNativeItemSpinner:
		{
			UIActivityIndicatorView *button = [[[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite] autorelease];
			[button startAnimating];
			return button;
		}
	}
	return nil;
}

+(UIView*)buttonWithType:(int)type
{
	UIView *button = [TiButtonUtil systemButtonWithType:type];
	if (button==nil)
	{
		button = [UIButton buttonWithType:type];
	}
	return button;
}

@end
