package com.siapp.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.siapp.excel.ExcelCreator;
import com.siapp.excel.HeaderModel;
import com.siapp.repositories.ReportRepository;
import com.siapp.utilities.ReportUtil;

@Service
public class ReportService {
	
	@Autowired
	ReportRepository reportRepository;
	
	/**
	 * GEt all tickets between a date range
	 */
	public List<HashMap<String, Object>> getAllTickets(Date startDate, Date endDate) {
		return ReportUtil.convertGetAllTicketsArrayToObject(this.reportRepository.getAllTickets(startDate, endDate));
	}
	
	public ExcelCreator getAllTicketsXlsx(Date startDate, Date endDate) {
		List<HashMap<String, Object>> items = ReportUtil.convertGetAllTicketsArrayToObject(this.reportRepository.getAllTickets(startDate, endDate));
		List<HeaderModel> headers = new ArrayList<HeaderModel>();
		HeaderModel h1 = new HeaderModel("Folio", "id");
		HeaderModel h2 = new HeaderModel("Fecha", "date");
		HeaderModel h3 = new HeaderModel("Expediente", "recordId");
		HeaderModel h4 = new HeaderModel("Paciente", "personName");
		HeaderModel h5 = new HeaderModel("Edad", "age");
		HeaderModel h6 = new HeaderModel("Sexo", "gender");
		HeaderModel h7 = new HeaderModel("Procedencia", "location");
		HeaderModel h8 = new HeaderModel("Parroquia", "church");
		HeaderModel h9 = new HeaderModel("Tipo de servicio", "serviceType");
		HeaderModel h10 = new HeaderModel("Colaborador", "therapistName");
		HeaderModel h11 = new HeaderModel("Aportacion", "total");
		HeaderModel h12 = new HeaderModel("Estado", "status");
		headers.add(h1);
		headers.add(h2);
		headers.add(h3);
		headers.add(h4);
		headers.add(h5);
		headers.add(h6);
		headers.add(h7);
		headers.add(h8);
		headers.add(h9);
		headers.add(h10);
		headers.add(h11);
		headers.add(h12);
		ExcelCreator excelCreator = new ExcelCreator(items, headers);
		return excelCreator;
	}

}
