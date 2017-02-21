$(function(){
  // $("body").append("<p> An other text</p>")
  var $orders = $('#orders');
  var $name = $('#name');
  var $drink = $('#drink');

  // var orderTemplate = "<li class='list'>name: {{name}}, drink: {{drink}}</li>";
  var orderTemplate = $('#order-template').html();

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
      url: 'http://rest.learncode.academy/api/michail/orders',
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

  $orders.delegate('.editOrder', 'click', function(){
    var $MBli = $(this).closest('li');
    $MBli.find('input.name').val($MBli.find('span.name').html());
    $MBli.find('input.drink').val($MBli.find('span.drink').html());
    $MBli.addClass('edit');
  });

  $orders.delegate('.cancelEdit', 'click', function(){
    $(this).closest('li').removeClass('edit');
  });

  $orders.delegate('.saveEdit', 'click', function(){
    var $MBli = $(this).closest('li');
    var order ={
      name: $MBli.find('input.name').val(),
      drink: $MBli.find('input.drink').val(),
    };
    $.ajax({
      type: 'PUT',
      url: 'http://rest.learncode.academy/api/michail/orders/' +$MBli.attr('data-id'),
      data: order,
      success: function(newOrder){
        $MBli.find('span.name').html(order.name);
        $MBli.find('span.drink').html($MBli.find('input.drink').val()); //html(order.drink);
        $MBli.removeClass('edit');
      },
      error: function(){
        alert('error updating orders');
      },
    });
  });

});
