$(document).ready(function () {
    // Only show button to view custom mechs if user is logged in
    if (getCookie("userName") == null || getCookie("userName") == "") {
        $("#link_1").css("display", "none");
    } else {
        $("#link_1").css("display", "block");
    }

    $(".selector").hover(
        function () {
            $(this).addClass("highlighted2");
        },
        function () {
            $(this).removeClass("highlighted2");
        }
    );

    $("#link_0").click(function () {
        $("#mechBaseSelector").toggleClass("showHide");
        $("#mechCustomSelector").removeClass("showHide");
    });

    $("#link_1").click(function () {
        $("#mechCustomSelector").toggleClass("showHide");
        $("#mechBaseSelector").removeClass("showHide");
    });

    $(".selectMech").click(function () {
        // Set selected mech cookie
        createCookie("selectedMech", $(this).html(), 14400000);

        $.get("/design/" + this.id, function (data) {
            if (data != null) {
                $("#mechDetails_oid").val(data["_id"]);
                $("#mechDetails_Name").val(data["mechName"]);
                $("#mechDetails_Weight").html(data["weight"]);
                $("#mechDetails_Speed").html(data["speed"]);

                if (data["baseMech"]) {
                    $("#mechDetails_delete").css("display", "none");
                    $("#mechDetails_save").val("Save as new Mech");
                } else {
                    $("#mechDetails_delete").css("display", "inline-block");
                    $("#mechDetails_save").val("Save Mech");
                }
            }

            $("#mechBaseSelector").removeClass("showHide");
            $("#mechCustomSelector").removeClass("showHide");
        });
    });

    // Load previously selected mech or first mech if null
    var clickedMech = false;
    $(".selectMech").each(function () {
        if ($(this).html() == getCookie("selectedMech")) {
            clickedMech = true;
            $(this).click();
        }
    });
    if (!clickedMech) {
        $(".selectMech:first").click();
    }

    $("#mechDetails_delete").click(function () {
        var mechID = $("input[name='_id']").val();
        deleteMech(mechID);
    });

    $("#mechDetails_save").click(function () {
        mechJSON = {
            _id: $("input[name='_id']").val(),
            weight: $("p[name='weight']").html(),
            speed: $("p[name='speed']").html(),
            mechName: $("input[name='mechName']").val(),
            userName: getCookie("userName"),
        };

        saveMechBool = true;
        for (var key in mechJSON) {
            if (mechJSON[key] == "") {
                saveMechBool = false;
            }
        }

        if (saveMechBool) {
            $.get("/design/mechName/" + mechJSON.mechName, function (data) {
                if (data != null && data != "") {
                    if (data["baseMech"]) {
                        if (data["mechName"] == mechJSON.mechName) {
                            alert("Must save Mech with a new name");
                        } else {
                            saveMech("saveNew", mechJSON);
                        }
                    } else {
                        saveMech("save", mechJSON);
                    }
                } else {
                    saveMech("saveNew", mechJSON);
                }

                createCookie("selectedMech", mechJSON.mechName, 14400000);
            });
        } else {
            alert("Some fields are missing. Please make sure that all fields are filled in.");
        }
    });

    $("#mechDetails_Weight_Down").click(function () {
        var currentMechWeight = $("#mechDetails_Weight").html();
        if (currentMechWeight > 20 && currentMechWeight <= 100) {
            $("#mechDetails_Weight").html((parseInt(currentMechWeight) - 1).toString());
        }
    });

    $("#mechDetails_Weight_Up").click(function () {
        var currentMechWeight = $("#mechDetails_Weight").html();
        if (currentMechWeight >= 20 && currentMechWeight < 100) {
            $("#mechDetails_Weight").html((parseInt(currentMechWeight) + 1).toString());
        }
    });

    $("#mechDetails_Speed_Down").click(function () {
        calcNewWalk("sub");
    });

    $("#mechDetails_Speed_Up").click(function () {
        calcNewWalk("add");
    });

    function calcNewWalk(mod) {
        var currentMechSpeed = $("#mechDetails_Speed").html();
        var mechWalk = currentMechSpeed.substr(0, currentMechSpeed.indexOf("-"));
        var mechJump = currentMechSpeed.substr(currentMechSpeed.length - 1);

        if (mod == "sub" && mechWalk > 2) {
            mechWalk = (parseInt(mechWalk) - 1).toString();
        } else if (mod == "add" && mechWalk < 12) {
            mechWalk = (parseInt(mechWalk) + 1).toString();
        }
        var mechRun = Math.floor(mechWalk * 1.5);
        $("#mechDetails_Speed").html(mechWalk + "-" + mechRun + "-" + mechJump);
    }
});

function saveMech(saveString, mechJSON) {
    $.ajax({
        url: "/design/" + saveString,
        type: "POST",
        data: JSON.stringify(mechJSON),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert(response);

            if (response.indexOf("Created new mech") >= 0) {
                window.open("/design", "_self");
            }
            if (response.indexOf("Mech Details Saved") >= 0) {
                $(".selectMech").each(function () {
                    if ($(this).html() == mechJSON.mechName) {
                        $(this)
                            .next()
                            .html("Speed: " + mechJSON.speed + " Weight: " + mechJSON.weight + " Primary Weapon:");
                    }
                });
            }
        },
    });
}

function deleteMech(mechID) {
    $.ajax({
        url: "/design/removeMech/" + mechID,
        type: "POST",
        success: function (response) {
            alert(response);

            if (response.indexOf("Mech Deleted") >= 0) {
                window.open("/design", "_self");
            }
        },
    });
}
