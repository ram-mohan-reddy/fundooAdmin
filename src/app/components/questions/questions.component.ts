import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import 'datatables.net';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function () {

      $("#dashboard").click(function () {
        $(location).attr('href', "admin/home");
      });
      $.ajax({
        url: 'http://34.213.106.173/api/questionAndAnswerNotes/getUnApprovedAnswer',
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          var questions = data.data
          console.log(questions[0]);
          var questionsData = [];
          for (var i = 0; i < questions.length; i++) {
            questionsData.push([i+1, questions[i].message, 
            '<button id="approve" class="btn btn-outline-success my-2 " type="button">Approve</button> <button id="reject" class="btn  btn-outline-warning my-2 " type="button">Reject</button>'
            ]);
          }
        var table = $('#table').DataTable({
            data: questionsData,
            "columns": [
              { "width": "10%" },
              { "width": "70%" },
              { "width": "20%" }
            ],
            // deferRender: true,
            // scrollY: 200,
            // scrollCollapse: true,
            // scroller: true
          });  

          $('#table tbody').on('click', '#approve', function () {
            var id = $(this).closest('tr');
            var index = table.row(id).data();
            console.log(index); 
            console.log(index[0]);
            var questionIndex = index[0]-1;
            var questionId = questions[questionIndex].id
            $.ajax({
              url: 'http://34.213.106.173/api/questionAndAnswerNotes/approve/'+questionId,
              type: "POST",
              headers: {
                'Authorization': localStorage.getItem('token'),
              },
              success: function (res) {
                console.log(res);
                $('#response').html('<i><h5>' + res.data.message + '</h5></i>');
                $("#trigger").click();
                $(id).find('.btn').prop("disabled", true);
              },
              error: function (error) {
                console.log(error);
                $("h6").text("Unauthorized").show().fadeOut(5000);
              }
            });
          });    
          
          $('#table tbody').on('click', '#reject', function () {
            var id = $(this).closest('tr');
            var index = table.row(id).data();
            var questionIndex = index[0]-1;
            var questionId = questions[questionIndex].id  
            $.ajax({
              url: 'http://34.213.106.173/api/questionAndAnswerNotes/reject/'+questionId,
              type: "POST",
              headers: {
                'Authorization': localStorage.getItem('token'),
              },
              success: function (res) {
                console.log(res);
                $('#response').html('<i><h5>' + res.data.message + '</h5></i>');
                $("#trigger").click();
                $(id).find('.btn').prop("disabled",true);
              },
              error: function (error) {
                console.log(error);
                $("h6").text("Unauthorized").show().fadeOut(5000);
              }
            });
          }); 
        },
        error: function (error) {
          console.log(error);
        }        
      });
    });
  }
}
