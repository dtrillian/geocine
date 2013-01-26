// Backbone.emulateHTTP = true; // Use _method parameter rather than using DELETE and PUT methods
// Backbone.emulateJSON = true; // Send data to server via parameter rather than via request content

// window.Event = Backbone.Model.extend({
//     defaults : {
//         id : "",
//         title : "Super Mega Event",
//         date : "21/12/2013",
//         description : "Super description du super évènement",
//         creator : "malik.mba@gmail.com"
//     },
    
//     initialize : function Event() {
//         console.log('Event Constructor');
//     },
    
//     urlRoot:'http://localhost:2403/event',
    
//     url: function() {
//         var base = this.urlRoot || (this.collection && this.collection.url) || "/";
//         if (this.isNew()) return base;
 
//         return base + "/" + encodeURIComponent(this.id);
//     },

//     getId : function() {
//         return this.get('id');
//     },
//     setId : function(value) {
//         this.set({ id : value });
//     },
//     getTitle : function() {
//         return this.get ('title');
//     },
//     setTitle : function(value) {
//         this.set({ title : value });
//     },
//     getDate : function() {
//         return this.get('date');    
//     },
//     setDate : function(value) {
//         this.set({ date : value });
//     },
//     getDescription : function() {
//         return this.get('description');    
//     },
//     setDescription : function(value) {
//         this.set({ description : value });
//     },
//     getCreator : function() {
//         return this.get('creator');    
//     },
//     setCreator : function(value) {
//         this.set({ creator : value });
//     }
    
// });

// window.Events = Backbone.Collection.extend({
//     initialize : function() {
//         console.log('Events collection initializer');
//     },

//     model:Event,
//     url:'http://localhost:2403/event'
// });

// var newEvent = new Event({
//     id:'',
//     title:'Event 1',
//     date:'21/01/2013',
//     description:'PROUT',
//     creator:'malik.mba@gmail.com'
// });

// var serverEvent = new Event({name:"Billard KB"});
// serverEvent.fetch();

// console.log(serverEvent.toJSON());

// var events = new Events(newEvent);

// window.events.add([
//     {
//         id:'',
//         title:'Event 2',
//         date:'21/01/2013',
//         description:'POUET',
//         creator:'malik.mba@gmail.com'
//     }, 
//     {
//         id:'',
//         title:'Event 3',
//         date:'21/01/2013',
//         description:'KKUET',
//         creator:'malik.mba@gmail.com'
//     }
// ]);

// // newEvent = new Event({title:"Event in DB ??", date:"today"});
// // newEvent.save(); // create and save a new model on the server, also get id back and set it

// // events.add(newEvent);



// console.log(events.toJSON());



document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("body > section > header > a").addEventListener("click", function(){
        var region = document.querySelector("body > section");

        if ( region.getAttribute("data-state") == "drawer" ) {
          region.setAttribute("data-state", "none");

        } else {
          region.setAttribute("data-state", "drawer");
        }

    });

});