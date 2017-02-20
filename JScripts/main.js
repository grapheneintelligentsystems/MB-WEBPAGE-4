$(function(){
  // $("body").append("<p> An other text</p>")
  var $orders = $('#orders');
  var $name = $('#name');
  var $drink = $('#drink');

  // var orderTemplate = "<li class='list'>name: {{name}}, drink: {{drink}}</li>";
  var orderTemplate = "<li class='list'>"+
  "<p><strong>Name: {{name}}</p>"+
  "<p><strong>Drink: {{drink}}"+
  " <button data-id='{{id}}' class='remove'>X</button>"+
  "</li>";

  function addOrderMB(order){
    // $orders.append('<li class="list">Name: '+order.name+', Drink: '+order.drink+', id:'+order.id+'</li>');
    var MBTemplate = Mustache.render(orderTemplate, order);
    $orders.append(MBTemplate);
  }

  $.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/michail/orders/',
    // url: 'http://rest.learncode.academy/api/learncode/friends',
    success: function(orders){
      console.log('success', orders);
      $.each(orders, function(i, order){
        addOrderMB(order);
      });
    },
    error: function(){
      alert('error loading orders');
    },
  });

  $('#add-order').on('click', function(){
    var order = {
      name: $name.val(),
      drink: $drink.val(),
    };

    $.ajax({
      type: 'POST',
      url: 'http://rest.learncode.academy/api/michail/orders/',
      data: order,
      success: function(newOrder){
        addOrderMB(newOrder);
      },
      error: function(){
        alert('error saving orders');
      },
    });
  });

  //$('.remove').on('click', function(){ //not working because remove donn't exist yet in document is asynchronous
  $orders.delegate('.remove', 'click', function(){ //need to listen in orders ul for clicks on remove
    var $MBid = $(this).attr('data-id');
    var $MBli = $(this).closest('li');

    $.ajax({
      type: 'DELETE',
      url: 'http://rest.learncode.academy/api/michail/orders/' + $MBid,
      success: function(delOrder){
        //$MBli.remove(); //to simple add fadeout for some visual effect
        $MBli.fadeOut(300, function(){
          $(this).remove();
        });
      },
      error: function(){
        alert('error deleting orders');
      },
    });
  });

});
