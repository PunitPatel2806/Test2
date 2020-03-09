/*
Author : Punit Patel
Date : 8 March 2020
Description : This Page is edited according to the requirements of WEBD6201-Clientside Scripting Test #2 to function the New Task List button, Edit tasklist button and delete task list butto.


*/
class Contact
{
    constructor(contactName = "", emailAddress = "", contactNumber = "", contactMessage = "")
    {
        this.contactName = contactName;
        this.emailAddress = emailAddress;
        this.contactNumber = contactNumber;
        this.contactMessage = contactMessage;
    }
}




"use strict";
//IIFE - Immediately Invoked Function Expression
// mean? -> anonymous self-executing function

let app;
(function(app){

    // Declare Function Variables here...
    console.log("%cDeclaring Variables", "color: red;")
    let contactObject = new Contact();

    /**
     * Variable initialization in this function
     *
     */
    function Start()
    {
       PageSwitcher();

        Main();
    }

    function PageSwitcher()
    {
        let name = window.location.pathname;

        

        let pageName = name.substring(1, name.length - 5);

        // fixed bug in page switching
        let n = pageName.lastIndexOf("/");
     pageName = pageName.substring(n + 1);
        if(name == "/")
        {
            pageName = "index";
        }
        
       
        
       switch(pageName)
        {
            case "index":
               DisplayHomePageContent();
                break;
            case "products":
                DisplayProductsContent();
                break;
            case "services":
                DisplayServicesContent();
                break;
            case "about":
                DisplayAboutContent();
                break;
            case "contact":
                DisplayContactContent();
                break;
            case "projects":
                DisplayProjectsContent();
                break;
            case "login":
                DisplayLoginContent();
                break;
            case "register":
                DisplayRegisterContent();
                break;
            case "tasklist":
                DisplayTaskList();
                break;
            default:
                console.error("Landed in a page that is not defined");
                break;
        }

    }

    function DisplayHomePageContent()
    {
        document.getElementById("home").className = "nav-item active";

        document.title = "WEBD6201 - Home";
        
        $("#taskListButton").on("click", function(){
            location.href = "./tasklist.html";
        });

        let taskListButton = $("#taskListButton").click(function(){
            location.href = "./tasklist.html";
        });
    }
    
    // $(function(){
    //     $("#taskListButton").on("click", function(){
    //         location.href = "./tasklist.html";
    //     });
    // });

    function DisplayTaskList()
    {
        document.title = "WEBD6201 - Task List";

        // Task 1 a
        $("#newTaskButton").on("click", function(){ // On click of New task button the button will add the Task to the list.
            let NewTask = $("#taskTextInput").val(); 
            if (NewTask!=""){
            $("ul#taskList").append("<li class=\"list-group-item\" id=\"task\">"+ // This the whole li of the new task according to the existing one's.
            "<span id=\"taskText\">"+NewTask+"</span>"+
            "<span class=\"float-right\">"+
              "<button class=\"btn btn-outline-primary btn-sm editButton\"><i class=\"fas fa-edit\"></i>"+
              "<button class=\"btn btn-outline-danger btn-sm deleteButton\"><i class=\"fas fa-trash-alt\"></i></button>"+
            "</span>"+
            "<input type=\"text\" class=\"form-control edit-task editTextInput\" value = \""+NewTask+"\">"+
          "</li>");
          $("#taskTextInput").val(""); 
            }
            else{
                alert("Please enter a task name!!");
            }
        });

        // Task 1 b
        $("ul").on("click", ".editButton", function(){ // On click of edit button new text editing block will display.
            console.log($(this).closest("li").find(".editTextInput"));
            $(this).closest("li").find(".editTextInput").css("display","block");

        });
        $("ul").on("keypress", ".editTextInput", function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){ // On press of enter key the task list name Will be canged.
        let editText = $(this).val();
        if(editText != ""){
            $(this).closest("li").find("#taskText").html(editText);
            $(this).closest("li").find(".editTextInput").removeAttr("style");
        } 
        else{ // Else i f the user has empty task list then it will alert the user to enter a tsk name.
            alert("Please enter a task name!!");
        }
    }
        });

        // Task 1 c
        $("ul").on("click", ".deleteButton", function(){ // On click of Delete button the Task will be deleted but with a confirmation and then give a alert message.
            if(confirm("Are You Sure?")){
            $(this).closest("li").remove();
            alert("Task Sucessfully Deleted.");
            }
            
        });
    }

    function DisplayProductsContent()
    {
        document.title = "WEBD6201 - Products";
    }

    function DisplayServicesContent()
    {
        document.title = "WEBD6201 - Services";
    }

    function DisplayAboutContent()
    {
        document.title = "WEBD6201 - About Us";
    }

    function DisplayContactContent()
    {
        document.title = "WEBD6201 - Contact Us";
        function clearForm()
        {
            //document.getElementById("contactForm").reset();
            $("#contactForm")[0].reset();
            $("#errorMessage").hide();
        }

        function validateInput(selector, condition, errorMessage)
        {
            if(condition)
            {
                $("#errorMessage").show();
                $("#errorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else
            {
                $("#errorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        $("#errorMessage").hide();
        $("#contactName").select();

        // Contact Name Events
        $("#contactName").blur((e)=>
        {
            validateInput("#contactName",( $("#contactName").val().length < 2),"Contact Name is Too Short");
        });

        $("#contactName").focus((e)=>
        {
            $("#contactName").select();
        });

        // Email Events
        $("#emailAddress").blur((e)=>
        {
            validateInput("#emailAddress",($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")),"Invalid Email Address");
        });

        $("#emailAddress").focus((e)=>
        {
            $("#emailAddress").select();
        });

        // Contact Number Events
        $("#contactNumber").blur((e)=>
        {
            let phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
            let phoneNumber = $("#contactNumber").val();

            validateInput("#contactNumber",( !phonePattern.test(phoneNumber)),"Invalid Contact Number");
        });

        $("#contactNumber").focus((e)=>
        {
            $("#contactNumber").select();
        });

        // Contact Message Events
        $("#contactMessage").blur((e)=>
        {
            validateInput("#contactMessage",( $("#contactMessage").val().length < 2 ),"Contact Message Too Short");
        });

        $("#contactMessage").focus((e)=>
        {
            $("#contactMessage").select();
        });


        $("#contactForm").submit  ((e)=>
        {
            if(document.getElementById("contactForm").checkValidity() == false)
            {
                e.preventDefault();
                e.stopPropagation();
                console.log("form not valid");
            }

            
            let contactName = $("#contactName").val();
            let emailAddress = $("#emailAddress").val();
            let contactNumber = $("#contactNumber").val();
            let contactMessage = $("#contactMessage").val();

            console.log(`Contact Name: ${contactName}`);
            console.log(`Email Address: ${emailAddress}`);
            console.log(`Contact Number: ${contactNumber}`);
            console.log(`Contact Message: ${contactMessage}`);

            contactObject.contactName = contactName;
            contactObject.emailAddress = emailAddress;
            contactObject.contactNumber = contactNumber;
            contactObject.contactMessage = contactMessage;

            console.log(contactObject);

            clearForm();
        });

        $("#resetButton").click((e)=>
        {
            e.preventDefault();
            if(confirm("Are You Sure?"))
            {
                clearForm();
            }

            
        });
    }

    function DisplayProjectsContent()
    {
        document.title = "WEBD6201 - Projects";
    }

    function DisplayLoginContent()
    {
        document.title = "WEBD6201 - Login";

        $("#loginForm").submit  ((e)=>
        {
           
            e.preventDefault();
            e.stopPropagation();
            $("#loginForm")[0].reset();
            $("#login").hide();
            $("#logout").show();

        });

    }

    function DisplayRegisterContent()
    {
        document.title = "WEBD6201 - Register";
    }

    /**
     * Main Program entry point is here
     *
     */
    function Main()
    {
       
    }
    
    

    window.addEventListener("load", Start);
})(app || (app = {}));

