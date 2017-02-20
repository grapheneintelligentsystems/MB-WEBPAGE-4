$(function(){
  // $("body").append("<p> An other text</p>")
  var $orders = $('#orders');
  var $name = $('#name');
  var $drink = $('#drink');

  function addOrderMB(order){
    $orders.append('<li class="list">Name: '+order.name+', Drink: '+order.drink+', id:'+order.id+'</li>');
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

});
