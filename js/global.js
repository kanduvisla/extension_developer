window.addEventListener('DOMContentLoaded', function(e){
    document.getElementById('type').addEventListener('change', function(e){
        if(this.value == 'Own')
        {
            document.querySelector('div.own-type').style.display = 'block';
        } else {
            document.querySelector('div.own-type').style.display = 'none';
        }
        // Show extra options for specific field types:
        var elems = document.querySelectorAll('fieldset.type');
        for(var i=0; i<elems.length; i++)
        {
            elems[i].style.display = 'none';
        }
        if(document.querySelector('fieldset.' + this.value.toLowerCase()))
        {
            document.querySelector('fieldset.' + this.value.toLowerCase()).style.display = 'block';
        }
    });

    // For debugging:
    if(document.getElementById('testdata'))
    {
        document.getElementById('testdata').addEventListener('click', function(e){
            e.preventDefault();
            var elems = document.querySelectorAll('input[type=text]');
            for(var i=0; i<elems.length; i++)
            {
                elems[i].value = elems[i].getAttribute('data-debug');
            }
            // Custom delegates:
            var elems = document.querySelectorAll('label.delegate input');
            for(var i=0; i<elems.length; i++)
            {
                if(Math.random() < .1) { elems[i].checked = true; }
            }
        });
    }

    // For live update:
    var elems = document.querySelectorAll('input, select, textarea');
    for(var i=0; i<elems.length; i++)
    {
        elems[i].addEventListener('change', function(e){
            liveUpdate();
        });
    }
});

function liveUpdate()
{
    // Serialize the form and submit it with AJAX:
    ajaxSubmit(document.forms[0], function(xmlhttp){
        if(xmlhttp.responseText == 'done')
        {
            document.querySelector('iframe').src = 'show_export.php?v=' + Math.random();
        }
    });
}