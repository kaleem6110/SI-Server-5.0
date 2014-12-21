package com.wfp.utils;
import java.text.SimpleDateFormat; 
import java.util.Calendar; 
import java.util.Date; 
import java.util.TimeZone; 
 
public class TimZoneTest { 
    public static void main (String[] args){ 
        //<GMT><+/-><hour>:<minutes> 
        // Any screw up in this format, timezone defaults to GMT QUIETLY. So test your format a few times. 
 
        System.out.println(my_time_in("GMT-5:00", "MM/dd/yyyy HH:mm:ss") ); 
        System.out.println(my_time_in("GMT+5:30", "'at' HH:mm a z 'on' MM/dd/yyyy")); 
 
        System.out.println("---------------------------------------------"); 
        // Alternate format  
        System.out.println(my_time_in("America/Los_Angeles", "'at' HH:mm a z 'on' MM/dd/yyyy") ); 
        System.out.println(my_time_in("America/Buenos_Aires", "'at' HH:mm a z 'on' MM/dd/yyyy") ); 
 
 
    } 
 
    public static String my_time_in(String target_time_zone, String format){ 
        TimeZone tz = TimeZone.getTimeZone(target_time_zone); 
        Date date = Calendar.getInstance().getTime(); 
        SimpleDateFormat date_format_gmt = new SimpleDateFormat(format); 
        date_format_gmt.setTimeZone(tz); 
        return date_format_gmt.format(date); 
    } 
 
} 
