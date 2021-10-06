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
	
	/**
	 * GEt all tickets between a date range
	 */
	public List<HashMap<String, Object>> getAllOtherTickets(Date startDate, Date endDate) {
		List<HashMap<String, Object>> otherTickets = ReportUtil.convertGetAllOtherTicketsArrayToObject(this.reportRepository.getAllOtherTickets(startDate, endDate));
		for (HashMap<String, Object> otherTicket : otherTickets) {
			Integer otherTikcetId = (Integer) otherTicket.get("id");
			List<Object[]> therapistNames = this.reportRepository.getTherapistsByOtherItcketId(otherTikcetId);
			String names = "";
			for (Object therapistName : therapistNames) {
				names = names.concat((String) therapistName);
				names = names.concat(" / ");
			}
			names = names.substring(0, names.length() - 3);
			otherTicket.put("therapistName", names);
		}
		return otherTickets;
	}
	
	public ExcelCreator getAllTicketsXlsx(Date startDate, Date endDate) {
		List<HashMap<String, Object>> normalTickets = this.getAllTickets(startDate, endDate);
		List<HashMap<String, Object>> otherTickets = this.getAllOtherTickets(startDate, endDate);
		
		// Merge other tickets into normal tickets
		for (HashMap<String, Object> otherTicket : otherTickets) {
			normalTickets.add(otherTicket);
		}
		
		
		List<HeaderModel> headers = new ArrayList<HeaderModel>();
		HeaderModel h1 = new HeaderModel("Folio", "id");
		HeaderModel h2 = new HeaderModel("Fecha", "date");
		HeaderModel h3 = new HeaderModel("Expediente", "recordId");
		HeaderModel h4 = new HeaderModel("Paciente", "personName");
		HeaderModel h5 = new HeaderModel("Edad", "age");
		HeaderModel h6 = new HeaderModel("Sexo", "gender");
		HeaderModel h7 = new HeaderModel("Localidad", "location");
		HeaderModel h8 = new HeaderModel("Municipio", "city");
		HeaderModel h9 = new HeaderModel("Parroquia", "church");
		HeaderModel h10 = new HeaderModel("Tipo de servicio", "serviceType");
		HeaderModel h11 = new HeaderModel("Colaborador", "therapistName");
		HeaderModel h12 = new HeaderModel("Aportacion", "total");
		HeaderModel h13 = new HeaderModel("Estado", "status");
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
		headers.add(h13);
		ExcelCreator excelCreator = new ExcelCreator(normalTickets, headers);
		return excelCreator;
	}

	public HashMap<String, Object> ticketsStatistics(Date startDate, Date endDate) {
		HashMap<String, Object> report = new HashMap<String, Object>();
		List<Object[]> totalServicesArray = this.reportRepository.getTotalServices(startDate, endDate);
		String[] totalServicesKeys = {"totalService", "totalMoneyService", "serviceName"};
		List<HashMap<String, Object>> totalServicesGeneral = ReportUtil.convertArrayToObjectList(totalServicesArray, totalServicesKeys);
		report.put("totalServicesGeneral", totalServicesGeneral);
		
		List<Object[]> totalServicesByTherapistArray = this.reportRepository.getTotalServicesByTherapist(startDate, endDate);
		String[] totalServicesByTherapistKeys = {"totalServices", "totalMoneyServices", "therapistId", "therapistName"};
		List<HashMap<String, Object>> totalServicesByTherapist = ReportUtil.convertArrayToObjectList(totalServicesByTherapistArray, totalServicesByTherapistKeys);
		report.put("totalServicesByTherapist", totalServicesByTherapist);
		return report;
	}

}
