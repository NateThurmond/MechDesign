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

    // INITIAL PAGE LOAD, data has already been fetch from express/pug template as fullMechData

    // Build armor plots for mech
    displayArmorSection("mechArmor", fullMechData);
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

// FUNCTION TO DISPLAY ARMOR VALUES (External armor that is)
function displayArmorSection(displayLocale, mechData) {
    console.log(mechData);

    const mechArmorContainer = document.getElementById("mechArmor");
    $(mechArmorContainer).empty();

    // Add arm armor
    const armorCirclesLeftArm = parseInt(mechData.mechexternalarmor_armLeftArmor);
    const armorCirclesRightArm = parseInt(mechData.mechexternalarmor_armRightArmor);
    const numDivsLeftArm = Math.ceil(armorCirclesLeftArm / 10);
    const numDivsRightArm = Math.ceil(armorCirclesRightArm / 10);

    const armContainer = document.createElement("div");
    armContainer.id = "arm";

    armContainer.appendChild(armorDisplayCircles("leftArmArmor", armorCirclesLeftArm, numDivsLeftArm));
    armContainer.appendChild(armorDisplayCircles("rightArmArmor", armorCirclesRightArm, numDivsRightArm));

    armContainer.innerHTML += `
        <div id="leftArmArmorNumeric"><p>${armorCirclesLeftArm}</p></div>
        <div id="rightArmArmorNumeric"><p>${armorCirclesRightArm}</p></div>
    `;
    mechArmorContainer.appendChild(armContainer);

    // Add head armor
    const armorCirclesHead = parseInt(mechData.mechexternalarmor_headArmor);
    const numDivsHead = Math.ceil(armorCirclesHead / 3);

    const headContainer = document.createElement("div");
    headContainer.id = "head";

    headContainer.appendChild(armorDisplayCircles("mechHeadArmor", armorCirclesHead, numDivsHead));
    headContainer.innerHTML += `<div id="mechHeadArmorNumeric"><p>${armorCirclesHead}</p></div>`;
    mechArmorContainer.appendChild(headContainer);

    // Add center armor
    const armorCirclesCenter = parseInt(mechData.mechexternalarmor_centerArmor);
    const armorCirclesRearCenter = parseInt(mechData.mechexternalarmor_rearCenterArmor);
    const numDivsCenter = Math.ceil(armorCirclesCenter / 9);
    const numDivsRearCenter = Math.ceil(armorCirclesRearCenter / 9);

    const centerContainer = document.createElement("div");
    centerContainer.id = "center";

    centerContainer.appendChild(armorDisplayCircles("centerArmor", armorCirclesCenter, numDivsCenter));
    centerContainer.appendChild(armorDisplayCircles("centerRearArmor", armorCirclesRearCenter, numDivsRearCenter));

    centerContainer.innerHTML += `
        <div id="centerArmorNumeric"><p>${armorCirclesCenter}</p></div>
        <div id="centerRearArmorNumeric"><p>${armorCirclesRearCenter}</p></div>
    `;
    mechArmorContainer.appendChild(centerContainer);

    // Torsor Armor
    const armorCirclesLeftTorso = parseInt(mechData.mechexternalarmor_torsoLeftArmor);
    const armorCirclesRightTorso = parseInt(mechData.mechexternalarmor_torsoRightArmor);
    const armorCirclesLeftRear = parseInt(mechData.mechexternalarmor_rearLeftTorsoArmor);
    const armorCirclesRightRear = parseInt(mechData.mechexternalarmor_rearRightTorsoArmor);

    const armorTorsoLeftTop = Math.round(armorCirclesLeftTorso * 0.57);
    const numDivsTorsoLeftTop = Math.ceil(armorTorsoLeftTop / 4);
    const armorTorsoRightTop = Math.round(armorCirclesRightTorso * 0.57);
    const numDivsTorsoRightTop = Math.ceil(armorTorsoRightTop / 4);
    const armorTorsoLeftBottom = Math.round(armorCirclesLeftTorso * 0.285);
    const numDivsTorsoLeftBottom = Math.ceil(armorTorsoLeftBottom / 2);
    const armorTorsoRightBottom = Math.round(armorCirclesRightTorso * 0.285);
    const numDivsTorsoRightBottom = Math.ceil(armorTorsoRightBottom / 2);
    const armorTorsoLeftMiddle = armorCirclesLeftTorso - (armorTorsoLeftTop + armorTorsoLeftBottom);
    const numDivsTorsoLeftMiddle = Math.ceil(armorTorsoLeftMiddle / 3);
    const armorTorsoRightMiddle = armorCirclesRightTorso - (armorTorsoRightTop + armorTorsoRightBottom);
    const numDivsTorsoRightMiddle = Math.ceil(armorTorsoRightMiddle / 3);
    const numDivsTorsoLeftRear = Math.ceil(armorCirclesLeftRear / 4);
    const numDivsTorsoRightRear = Math.ceil(armorCirclesRightRear / 4);

    const torsoContainer = document.createElement("div");
    torsoContainer.id = "torso";

    torsoContainer.appendChild(armorDisplayCircles("leftTorsoArmorTop", armorTorsoLeftTop, numDivsTorsoLeftTop));
    torsoContainer.appendChild(
        armorDisplayCircles("leftTorsoArmorMiddle", armorTorsoLeftMiddle, numDivsTorsoLeftMiddle)
    );
    torsoContainer.appendChild(
        armorDisplayCircles("leftTorsoArmorBottom", armorTorsoLeftBottom, numDivsTorsoLeftBottom)
    );

    torsoContainer.appendChild(armorDisplayCircles("rightTorsoArmorTop", armorTorsoRightTop, numDivsTorsoRightTop));
    torsoContainer.appendChild(
        armorDisplayCircles("rightTorsoArmorMiddle", armorTorsoRightMiddle, numDivsTorsoRightMiddle)
    );
    torsoContainer.appendChild(
        armorDisplayCircles("rightTorsoArmorBottom", armorTorsoRightBottom, numDivsTorsoRightBottom)
    );

    torsoContainer.appendChild(armorDisplayCircles("leftRearTorsoArmor", armorCirclesLeftRear, numDivsTorsoLeftRear));
    torsoContainer.appendChild(
        armorDisplayCircles("rightRearTorsoArmor", armorCirclesRightRear, numDivsTorsoRightRear)
    );

    torsoContainer.innerHTML += `
        <div id="leftTorsoArmorNumeric">${armorCirclesLeftTorso}</div>
        <div id="rightTorsoArmorNumeric">${armorCirclesRightTorso}</div>
        <div id="leftRearTorsoArmorNumeric">${armorCirclesLeftRear}</div>
        <div id="rightRearTorsoArmorNumeric">${armorCirclesRightRear}</div>
    `;
    mechArmorContainer.appendChild(torsoContainer);

    // And finally leg armor
    const armorCirclesLeftLeg = mechData.mechexternalarmor_legLeftArmor;
    const armorCirclesRightLeg = mechData.mechexternalarmor_legRightArmor;

    const numDivsLeftLeg = Math.ceil(armorCirclesLeftLeg / 12);
    const numDivsRightLeg = Math.ceil(armorCirclesRightLeg / 12);

    const legSection = document.createElement("div");
    legSection.id = "leg";

    // Left Leg Armor
    legSection.appendChild(armorDisplayCircles("leftLegArmor", armorCirclesLeftLeg, numDivsLeftLeg));

    // Right Leg Armor
    legSection.appendChild(armorDisplayCircles("rightLegArmor", armorCirclesRightLeg, numDivsRightLeg));

    // Numeric Values for Left and Right Leg
    const leftLegNumeric = document.createElement("div");
    leftLegNumeric.id = "leftLegArmorNumeric";
    leftLegNumeric.textContent = armorCirclesLeftLeg;
    legSection.appendChild(leftLegNumeric);

    const rightLegNumeric = document.createElement("div");
    rightLegNumeric.id = "rightLegArmorNumeric";
    rightLegNumeric.textContent = armorCirclesRightLeg;
    legSection.appendChild(rightLegNumeric);

    // Append the leg section to the parent container
    mechArmorContainer.appendChild(legSection);
}

// FUNCTION TO DISPLAY ARMOR POINTS DYNAMICALLY AND EVENLY ACROSS MULTIPLE ROWS
function armorDisplayCircles(idToMod, armorCircles, divLines) {
    const container = document.createElement("div");
    container.className = "armorDisplayLayout";
    container.id = idToMod;

    let divCounter = 0;
    for (let count = 0; count < armorCircles; count++) {
        const circle = document.createElement("p");
        circle.className = "circle";
        container.appendChild(circle);
        divCounter++;
        if (divCounter % divLines === 0) {
            container.appendChild(document.createElement("br"));
        }
    }
    return container;
}
