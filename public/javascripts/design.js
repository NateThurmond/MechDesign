$(document).ready(function () {
    /* List all mechs available for viewing */
    $.getJSON("/design/mechs/list", (mechsToPick) => {
        mechsToPick.forEach((mechToPick) => {
            let {
                _id,
                mechs_armor,
                // mechs_era,
                mechs_introDate,
                mechs_maxTonnage,
                // mechs_mechID,
                mechs_mechModel,
                mechs_mechName,
                // mechs_productionYear,
                // mechs_techBase,
                mechengine_mechWalk,
            } = mechToPick;

            $(".mechPickTable").append(
                `<tr>
                    <td><a href='/design/${_id}'>${mechs_mechName}</a></td>
                    <td>${mechs_mechModel}</td>
                    <td>${mechs_armor}</td>
                    <td>${mechengine_mechWalk}</td>
                    <td>${mechs_maxTonnage}</td>
                    <td>${mechs_introDate}</td>
                </tr>`
            );
        });
    });

    // Only show button to view custom mechs if user is logged in
    if (getCookie("userName") == null || getCookie("userName") == "") {
        $("#link_1").css("display", "none");
    } else {
        $("#link_1").css("display", "block");
    }

    $("#mechSelector").on("click", function () {
        let posVis = $(".popoutTab:visible").length;
        hidePopout();
        if (posVis === 0) {
            showPopout("popoutTab");
        }
    });

    $("#armorSelector").on("click", function () {
        let posVis = $(".popoutTab2:visible").length;
        hidePopout();
        if (posVis === 0) {
            showPopout("popoutTab2");
        }
    });

    $("#weaponSelector").on("click", function () {
        let posVis = $(".popoutTab3:visible").length;
        hidePopout();
        if (posVis === 0) {
            showPopout("popoutTab3");
        }
    });

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

    $("#mechDetails_save").click(function () {
        mechJSON = {
            _id: fullMechData._id,
            weight: $("#mechTonnageDropDown").val(),
            speed: $(".movementValues").val(),
            mechName: $("input[name='mechName']").val(),
            userName: getCookie("userName") || "guest",
        };

        if (Object.values(mechJSON).some((e) => !e)) {
            alert("Some fields are missing. Please make sure that all fields are filled in.");
        }

        $.get("/design/mechName/" + mechJSON.mechName, function (data) {
            // saveMech("save", mechJSON);
            // saveMech("saveNew", mechJSON);
            // createCookie("selectedMech", mechJSON.mechName, 14400000);
        });
    });
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
                // Re-render / reload page with updated mech data ?
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

function showPopout(popoutId) {
    // Re-enable link bar at top
    $("#linkBar").addClass("blur");
    // Show the selected popout div
    var popout = document.querySelector("." + popoutId);
    if (popout) {
        popout.style.display = "block";
        setTimeout(function () {
            popout.style.top = "140px";
        }, 10); // Small delay to trigger the transition
    }
}

function hidePopout() {
    // Hide header bar to eliminate confusion in UI navigation
    $("#linkBar").removeClass("blur");
    // Hide all popout divs
    document.querySelectorAll(".popoutClass").forEach(function (popout) {
        popout.style.display = "none";
        popout.style.top = "-185px";
    });
}
