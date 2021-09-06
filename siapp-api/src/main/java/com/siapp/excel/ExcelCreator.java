package com.siapp.excel;
import java.io.IOException;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
 
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
 
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelCreator {
	private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private List<HashMap<String, Object>> items;
    private  List<HeaderModel> headers;
     
    public ExcelCreator(List<HashMap<String, Object>> items, List<HeaderModel> headers) {
        this.items = items;
        this.workbook = new XSSFWorkbook();
        this.headers = headers;
    }
 
 
    private void writeHeaderLine() {
        sheet = workbook.createSheet("Servicios");
         
        Row row = sheet.createRow(0);
         
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);
        int columIndex = 0;
        
        for (HeaderModel header : headers) {
        	createCell(row, columIndex++, header.getText(), style);
		}
         
    }
     
    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Double) {
            cell.setCellValue((Double) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        } else if (value instanceof Date) {
        	DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");  
        	String dateStr = dateFormat.format(value);  
           cell.setCellValue((String) dateStr);
        } else {
        	 cell.setCellValue((String) value);
        }
        cell.setCellStyle(style);
    }
     
    private void writeDataLines() {
        int rowCount = 1;
 
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);
                 
        for (HashMap<String, Object> item : items) {
            Row row = sheet.createRow(rowCount++);
            int columIndex = 0;
            
            for (HeaderModel header : headers) {
                Object value = item.get(header.getKey());
            	createCell(row, columIndex++, value, style);
    		}
             
        }
    }
     
    public void export(HttpServletResponse response) throws IOException {
        writeHeaderLine();
        writeDataLines();
         
        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
         
        outputStream.close();
         
    }

}
