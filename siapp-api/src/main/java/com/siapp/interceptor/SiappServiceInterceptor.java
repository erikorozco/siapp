package com.siapp.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import com.siapp.services.LogService;

@Component
public class SiappServiceInterceptor implements HandlerInterceptor {
	
	@Autowired
	LogService logService;
	
//   @Override
//   public boolean preHandle
//      (HttpServletRequest request, HttpServletResponse response, Object handler) 
//      throws Exception {
//      
//      return true;
//   }
//   @Override
//   public void postHandle(HttpServletRequest request, HttpServletResponse response, 
//      Object handler, ModelAndView modelAndView) throws Exception {
//      
//      System.out.println("Post Handle method is Calling");
//   }
	
   @Override
   public void afterCompletion
      (HttpServletRequest request, HttpServletResponse response, Object 
      handler, Exception exception) throws Exception {
	  
	  logService.createLogFromRequest(request);
	   
   }
   
   
}