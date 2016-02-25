$(document).ready(function(){
		
	$("#submitBtn").click(function(){
					
	$("#results").html("");
	
	//Get Search Value from the Search Box 
	
	var searchValue = $("#mySearch").val();
		
	if(searchValue) {
		
		var searchURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info%7Cextracts&generator=search&utf8=1&inprop=url&exsentences=1&exlimit=10&exintro=1&gsrsearch=" + searchValue; 
		
		$.ajax( {
		url: searchURL,
		dataType: 'jsonp',
		type: 'POST',
		headers: { 'Api-User-Agent': 'Example/1.0' },
		success: function(data) {
		
			var value;
			
			var searchArr = [];
			
			//Push all the objects inside SearchArr
			
			for(var i=0; i<10 ; i++) {
			
				value = data.query.pages[Object.keys(data.query.pages)[i]];	
				
					searchArr.push({
					
						index: value.index,
						title: value.title,
						extract: value.extract,
						url: value.fullurl
					
					});
					
				} 
				
				//Sort SearchArr according to index position of results
				searchArr.sort(function(a, b) {
					return parseInt(a.index) - parseInt(b.index);
				}); // End of Sort Function 
					
				var resHtml;
				var tagStrip ;
				
				//Display to results as HTML Content 						
				for(var j=0; j<searchArr.length; j++) {
				
					resHtml = "";
					
					tagStrip = $("<div/>").html(searchArr[j].extract).text();
					
					
					resHtml += "<a href='"+ searchArr[j].url + "'>"  + "<div id='resLists'>" + "<h3>" + searchArr[j].title + "</h3>" + "<p>" + tagStrip + "</p>" + "</div>" + "</a>";
					
					$("#results").append(resHtml);

				}
		   
			} //End of Success
		
			});	//End of Ajax Function

		} //End of If Condition

	}); // End of Click function
					
					
	// Code to enable search if Enter button is pressed 
	$('#mySearch').keypress(function(e){
		if(e.which == 13){//Enter key pressed
			$('#submitBtn').click();//Trigger search button click event
		}
	}); 
				
	// Code to get random article 
	$("#rSearch").click(function(){
	
		window.location = "http://en.wikipedia.org/wiki/Special:Random";
	
	});

}); // End of Document Ready Function