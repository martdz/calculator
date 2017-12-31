$(document).ready(function(){
math.config({number: 'BigNumber'});
var memory = "";
var hidden_memory = "";
var result = 0;
var val = "";
var re = /[* | / | \+ | \- | \\.]/;
	$("button").not( "#equal, .op, .dot").click(function(){
		$("#equal").removeClass(".pressed");
		val1 = $(this).val();
		if(memory.length == 1 && memory[0] == "0" && val1 !== "."){
			console.log("you can not press zero more than 1 time at the beginning");
		}else{
			val =  val.concat($(this).val());
			$("#answer").text(val);
			memory = memory.concat(val1);
			hidden_memory = hidden_memory.concat(val1);
			$("#memory").text(memory);
		}
	});
	$(".op").click(function(){
		val1 = $(this).val();
		if(memory.length == 0){
			memory = "0" + val1;
			hidden_memory = "0" + val1;
		}
		if(!hidden_memory[hidden_memory.length-1].match(re)){
			hidden_memory = math.eval(hidden_memory);
			hidden_memory = hidden_memory.toString();
		}
		if(memory[memory.length-1].match(re)){
			memory = memory.substring(0, memory.length-1) + val1;
			hidden_memory = hidden_memory.substring(0, hidden_memory.length-1).concat(val1);
		}else{
			memory = memory.concat(val1);
			hidden_memory = hidden_memory.concat(val1);
		}
		$("#memory").text(memory);
		$("#answer").text(hidden_memory);
		val = "";
	});
	$(".dot").click(function(){
		if(val.match(/[\\.]/g)){
			console.log("this val has dod already");
		}else{
		console.log("dot pressed event");
			$("#equal").removeClass(".pressed")
			val1 = $(this).val();
			if(memory.length == 0){
			console.log("if memory.length == 0");
				val = "0" + val1;
				memory = "0" + val1;
				hidden_memory = "0" + val1;
			}else if(memory.length > 0 && memory[memory.length-1].match(re)){
				val = val + "0" + $(this).val();
				memory = memory + "0" +val1;
				hidden_memory = hidden_memory + "0" +val1;
			}else{
			console.log("if memory.length == else");
				val =  val.concat($(this).val());
				memory = memory.concat(val1);
				hidden_memory = hidden_memory.concat(val1);
			}
			$("#answer").text(val);
			$("#memory").text(memory);
		}	
	});
	$("#equal").click(function(){
		if($("#equal").hasClass(".pressed")){
			memory = "";
			hidden_memory = "";
			result = 0;
			$("#answer").text(result);
			$("#memory").text(memory);
		}else{
			$("#equal").addClass(".pressed");
			result = math.eval(hidden_memory);
			console.log(typeof result);
			if (result.toString().length > 8){
				result = result.toExponential(3);
			}
			$("#answer").text(result);
			memory = memory.concat("=" + result);
			console.log(result);
			$("#memory").text(memory);
			memory = "";
			hidden_memory = "";
			result = 0;
			val = "";
		}
	});
	$("#ac").click(function(){
		memory = "";
		hidden_memory = "";
		result = 0;
		val = "";
		$("#answer").text(result);
		$("#memory").text(memory);
	});
	$("#ce").click(function(){
		val = "";
		$("#answer").text(val);
		var memory_sub = "";
		var memory_sub_hid = "";
		for(var i = 0; i < memory.length; i++){
			if(memory[i].match(re)){
				memory_sub = memory_sub.concat(" " + memory[i] + " ");
			}else{
				memory_sub = memory_sub.concat(memory[i]);
			}
		}
		var arr = memory_sub.split(" ");
		var last_numb = arr.pop();
		memory = arr.join("");
		memory = memory.concat(val);
		hidden_memory = memory;
		$("#memory").text(memory);
		result = 0;
		$("#answer").text(result);
	});
});