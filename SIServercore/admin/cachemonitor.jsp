<%@page import="java.util.Map" %>
<%@page import="java.util.List" %>
<%@page import="java.util.Set" %>
<%@page import="java.util.Iterator" %>
<%@page import="com.spacetimeinsight.cache.CacheController" %>
<%@page import="com.spacetimeinsight.cache.ICacheConstants" %>
<%

	response.setContentType("text/html");
	Map cacheMap = (Map)CacheController.getInstance().findObject(ICacheConstants.KEY_CACHE_MANAGER_MAP);
	int count = cacheMap == null ? 0 : cacheMap.size();
	out.println("No of elemements in cache = ["+count+"]</p>");
	out.println(" *************** cache type details  start *************</p>");
	Iterator<String> iterator = cacheMap.keySet().iterator();
	String[] keys = new String[count];
	Object obj = null;
	int noOfElements = 0;
	int i = 0;
	while(iterator.hasNext()) {
		keys[i++] = iterator.next();
		obj = cacheMap.get(keys[i-1]);
		if(obj instanceof List) {
			noOfElements = ((List)obj).size();
		} else if(obj instanceof Map) {
			noOfElements = ((Map)obj).size();
		} else if(obj instanceof Set) {
			noOfElements = ((Set)obj).size();
		} else if(obj instanceof Object[]) {
			noOfElements = ((Object[])obj).length;
		}
		out.println("Key = ["+keys[i-1]+"], object = ["+obj.getClass()+"], no of elements = ["+noOfElements+"]</p>");

		//if(noOfElements == 1) {
			if(obj instanceof Map) {
				Iterator objIterator = ((Map)obj).keySet().iterator();
				Object value = null;
				Object key = null;
				while(objIterator.hasNext()) {
					key = objIterator.next();
					value = ((Map)obj).get(key);
					if (value instanceof Map) {
						noOfElements = ((Map)value).size();
					} else {
						break;
					}

					out.println("&nbsp;&nbsp;&nbsp;&nbsp;Key = ["+key+"], object = ["+value.getClass()+"], no of elements = ["+noOfElements+"]</p>");
				}
			}
		//}
	}
	out.println(" *************** cache type details end ************* </p>");
	/*
	for(i = 0; i < count; i++) {
		cacheMap.remove(keys[i]);
	}
	*/
%>