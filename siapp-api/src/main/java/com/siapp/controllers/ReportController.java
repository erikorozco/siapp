package com.siapp.controllers;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.siapp.excel.ExcelCreator;
import com.siapp.services.ReportService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/reports", description = "Reports Module Controller", produces = "application/json")
@RequestMapping("/reports")
public class ReportController {
	
	@Autowired
	ReportService reportService;
	
	@ApiOperation(value = "Get tickets report between a date range", notes = "Returns a list of objects", responseContainer="List")
	@GetMapping("/ticketsAll")
	public List<HashMap<String, Object>> getAllTicketsData(
			HttpServletResponse response,
			@RequestParam("startDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date startDate, 
			@RequestParam("endDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date endDate,
			@RequestParam(defaultValue = "false") Boolean exportFile) throws IOException
	{
		if (exportFile) {
			response.setContentType("application/octet-stream");
	        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
	        String currentDateTime = dateFormatter.format(new Date());
	         
	        String headerKey = "Content-Disposition";
	        String headerValue = "attachment; filename=reporte_recibos_siapp" + currentDateTime + ".xlsx";
	        response.setHeader(headerKey, headerValue);
			ExcelCreator excelCreator = reportService.getAllTicketsXlsx(startDate, endDate);
			excelCreator.export(response);
			return null;
			
		} else {			
			return reportService.getAllTickets(startDate, endDate);
		}
		
    }
	

}
