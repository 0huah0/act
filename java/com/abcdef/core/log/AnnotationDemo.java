package com.abcdef.core.log;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;

public class AnnotationDemo {
	
	@Action(description="TEST SAVE")
	public void save(){
		System.out.println("save method");
	}
	
	public void get(){
		System.out.println("get method");
	}
	
	public AnnotationDemo() {
		
	}
	
	public static void main(String []args) throws SecurityException, NoSuchMethodException{
		AnnotationDemo demo=new AnnotationDemo();
		
		System.out.println("get Annotation");
		
		Method method=demo.getClass().getMethod("save");
		
		Action action=method.getAnnotation(Action.class);
		
		System.out.println("action:" + action);
		
		Annotation[]ans= method.getAnnotations();
		
		for(Annotation an:ans){
			System.out.println("an:" + ans.getClass().getName());
		}
		
		
	}
}
