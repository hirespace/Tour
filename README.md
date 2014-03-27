Tour
====

Bootstrap plugin to add a tour of a webpage. See working demo at http://hirespacedemos.azurewebsites.net/Tour

## Html markup

A tour element on the page is just a parent div with `class="tour"` and buttons or links to stop and start the tour.
Use the 'data-stop' and 'data-start' attributes to specify which elements should stop and start the tour. You can style the tour
however you want, but the bootstrap panel class works nicely, e.g
```html
<div class="panel panel-danger tour" id="my-tour">
<div class="panel-heading">
First time here? Take a tour of the website's features.
 </div>
 <div class="panel-body">
<button class="btn btn-danger" data-start="tour">Start</button>
<button class="btn btn-danger" data-stop="tour">Stop</button>
</div>
</div>
```

## Javascript

To implement the tour, you need to call the function on the element you want to attach a tour to. So for the above mark-up, you could call it as follows:
$('#my-tour').tour(options);

The 'options' parameter is a complex object with the following properties:
+ 'manual' : sets whether the tour needs to be clicked through or whether, on start, it runs automatically. This defaults to true.
+ 'delay': if manual is set to false, this determines the length of time between showing each item on the tour, in milliseconds. This defaults to 2000.
+ 'items' : this is an array of objects representing the tour items. Each item should have an 'id' property, which is the id of the div on the page, and a 'description' which is the text you want displayed for that div. They can also have an optional 'placement' property, dictating where the popover should appear. This defaults to 'right'.
So an example implementation might look like:

```javascript
 var options = {
     items: [{
        id: '#tour-0',
        description: 'This div does something',
        placement: 'left'
       },
       {
         id: '#tour-1',
         description: 'This div does something else'
       }],
     manual: false,
     delay: 1000
  };
 
  $('#my-tour').tour(options);
```

