(function () {
    var result = document.getElementById("results");
    this.test = function (name, fn) {
        var result = document.getElementById("results");
        var li = document.createElement("li");
        li.className = "pass";
        li.appendChild(document.createTextNode(name));
        result.appendChild(li);
        result = li.appendChild(document.createElement("ul"));

        function assert(value, desc) {
            //console.log(result);
            var li = document.createElement("li");
            li.className = value ? "pass" : "fail";
            li.appendChild(document.createTextNode(desc));

            result.appendChild(li);

            if (!value) {
                li.parentNode.parentNode.className = "fail";
            }
            return li;
        }
        
        var regex = fn.toString().match(/^function[\s]*\(\)[\s]*\{((.|\n|\r)*)\}$/);
        //console.log(regex[1]);
        eval(regex[1]);
        

    };

    this.assert = function assert(value, desc) {
        //console.log(result);
        var li = document.createElement("li");
        li.className = value ? "pass" : "fail";
        li.appendChild(document.createTextNode(desc));

        result.appendChild(li);

        if (!value) {
            li.parentNode.parentNode.className = "fail";
        }
        return li;
    };
            
})();

window.onload = function () {
    // assert used inside and outside test blocks
    assert(true, "Outside and before the test blocks");
    test("TestBlock A", function () {
        assert(true, "Inside test block A");
    });
    
    assert(true, "Outside and after the test block A");
    test("TestBlock B", function(){
        setTimeout(function(){assert(true, "test delayed B");}, 500);
    });
    assert(true, "Outside and after test block B");
    
    //Book assert
    test("Async Test #1", function () {
        setTimeout(function () {
            assert(true, "First  ab test completed");
        }, 1000);
    });
    test("Async Test #2", function () {
        setTimeout(function () {
            assert(true, "Second test completed");
        }, 1000);
    });
    
};