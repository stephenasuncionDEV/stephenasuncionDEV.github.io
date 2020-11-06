
function test() {
    console.log("test");
}

function draggable(el) {
    el.addEventListener('mousedown', function(e) {
      var offsetX = e.clientX - parseInt(window.getComputedStyle(this).left);
      var offsetY = e.clientY - parseInt(window.getComputedStyle(this).top);
      
      function mouseMoveHandler(e) {
        el.style.top = (e.clientY - offsetY) + 'px';
        el.style.left = (e.clientX - offsetX) + 'px';
      }
  
      function reset() {
        window.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseup', reset);
      }
  
      window.addEventListener('mousemove', mouseMoveHandler);
      window.addEventListener('mouseup', reset);
    });
}

draggable(document.getElementById("wrapper"));

document.getElementById("console_Input").value = " > Console";

$(document).ready(function() {
    $('#console_Input').keydown(function(event) {
        if (event.which == 13) {
            let input = document.getElementById("console_Input").value;
            let strInput = input.substring(input.indexOf(">") + 2, input.length);
            document.getElementById("console_Output").value += '\n'+ "[User] " + strInput;
            event.preventDefault();
            document.getElementById("console_Input").value = " > ";
         }
    });
    $('#console_Input').click(function(event) {
        document.getElementById("console_Input").value = " > ";
    });
});