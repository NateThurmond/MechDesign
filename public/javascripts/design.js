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

    // Get mech weapons from mongo
    $.getJSON("/weapons", function (res) {
        weaponArray = res;
        res.forEach((weaponEnt) => {
            dataByWeaponName[weaponEnt.weaponName] = weaponEnt;
        });

        // At this point, we can build out weapons selectors now that we have the data we need
        buildWeaponLis();
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

    $(document).on("click", ".weaponChildLI", function () {
        var weaponName = $(this).attr("name");
        let weaponDetails = dataByWeaponName[weaponName];

        // DELETE THE PREVIOUS DATA
        var myNode = document.getElementById("weaponDetails");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        for (var key in weaponDetails) {
            if (key === "_id") continue;
            var TD = document.createElement("td");
            TD.innerHTML = weaponDetails[key];
            document.getElementById("weaponDetails").appendChild(TD);
        }
    });

    $(".weaponAccordionLI").click(function () {
        if (!$(this).children().is(":visible")) {
            $(this).parent().children().children().slideUp();
            $(this).children().slideDown();
        }
    });

    $(".weaponAccordionLI")
        .on("mouseenter", function () {
            $(this).addClass("highlighted");
        })
        .on("mouseleave", function () {
            $(this).removeClass("highlighted");
        });

    $(document).on("mouseenter", ".weaponChildLI", function () {
        $(this).addClass("weaponHighlight");
    });

    $(document).on("mouseleave", ".weaponChildLI", function () {
        $(this).removeClass("weaponHighlight");
    });

    $(".selector")
        .on("mouseenter", function () {
            $(this).addClass("highlighted2");
        })
        .on("mouseleave", function () {
            $(this).removeClass("highlighted2");
        });

    $("#link_0").on("click", function () {
        $("#mechBaseSelector").toggleClass("showHide");
        $("#mechCustomSelector").removeClass("showHide");
    });

    $("#link_1").on("click", function () {
        $("#mechCustomSelector").toggleClass("showHide");
        $("#mechBaseSelector").removeClass("showHide");
    });

    $("#mechDetails_save").on("click", function () {
        // Details appended to fullMechData
        let mechDetailsToSave = {
            mechs_mechName: $("input[name='mechName']").val(),
            mechs_mechModel: $("input[name='mechModel']").val(),
        };

        // Must pass validation before saving is allowed
        let validateDetails = {
            speed: $(".movementValues").val(),
            userName: getCookie("userName") || "guest",
        };

        let alerts = [];

        if (parseInt(validateDetails.speed, 10) <= 0) {
            alerts.push("Speed must be between 1 and 12");
        }

        if ($("#totalWeight").css("color") === "rgb(255, 0, 0)") {
            alerts.push("Mech weight exceeds maximum tonnage");
        }

        if (
            Object.values({ ...validateDetails, ...mechDetailsToSave }).some(
                (e) => !e || (typeof e === "string" && !e.trim())
            )
        ) {
            alerts.push("Some fields are missing. Please make sure that all fields are filled in.");
        }

        if (alerts.length > 0) {
            alert(alerts.join("\n"));
            return;
        }

        fullMechData = { ...fullMechData, ...mechDetailsToSave };

        console.log(fullMechData);

        saveMech("saveMech", fullMechData);

        /* In case we add session ident. */
        // createCookie("selectedMech", mechJSON.mechName, 14400000);
    });

    $(document).on("click", ".upMovementArrow", function () {
        $(this)
            .prev()
            .val(parseInt($(this).prev().val(), 10) + 1);

        fullMechData.mechengine_mechWalk = $("#mechWalk").find(".movementValues").val();
        fullMechData.mechengine_mechRun = Math.ceil(fullMechData.mechengine_mechWalk * 1.5);
        $("#mechRun").find(".movementValues").val(fullMechData.mechengine_mechRun);
        fullMechData.mechengine_mechJump = $("#mechJump").find(".movementValues").val();
        updateEngine(false);
    });

    $(document).on("click", ".downMovementArrow", function () {
        let walkJumpMin = $(this).attr("id") === "downArrowWalk" ? 1 : 0;
        let prevNum = parseInt($(this).prev().prev().val(), 10);
        prevNum = prevNum - 1;
        prevNum = Math.max(prevNum, walkJumpMin);
        $(this).prev().prev().val(prevNum);

        fullMechData.mechengine_mechWalk = $("#mechWalk").find(".movementValues").val();
        fullMechData.mechengine_mechRun = Math.ceil(fullMechData.mechengine_mechWalk * 1.5);
        $("#mechRun").find(".movementValues").val(fullMechData.mechengine_mechRun);
        fullMechData.mechengine_mechJump = $("#mechJump").find(".movementValues").val();
        updateEngine(false);
    });

    $(".armorIncChevron, .armorDecChevron").on("click", function () {
        switch ($(this).attr("id")) {
            case "LeftTorsoInc":
                changeMechStats("torsoLeftArmor", "increase", "torso");
                break;
            case "LeftTorsoDec":
                changeMechStats("torsoLeftArmor", "decrease", "torso");
                break;
            case "RightTorsoInc":
                changeMechStats("torsoRightArmor", "increase", "torso");
                break;
            case "RightTorsoDec":
                changeMechStats("torsoRightArmor", "decrease", "torso");
                break;
            case "LeftRearTorsoInc":
                changeMechStats("rearLeftTorsoArmor", "increase", "torso");
                break;
            case "LeftRearTorsoDec":
                changeMechStats("rearLeftTorsoArmor", "decrease", "torso");
                break;
            case "RightRearTorsoInc":
                changeMechStats("rearRightTorsoArmor", "increase", "torso");
                break;
            case "RightRearTorsoDec":
                changeMechStats("rearRightTorsoArmor", "decrease", "torso");
                break;
            case "centerRearTorsoInc":
                changeMechStats("rearCenterArmor", "increase", "center");
                break;
            case "centerRearTorsoDec":
                changeMechStats("rearCenterArmor", "decrease", "center");
                break;
            case "RightLegInc":
                changeMechStats("legRightArmor", "increase", "leg");
                break;
            case "RightLegDec":
                changeMechStats("legRightArmor", "decrease", "leg");
                break;
            case "LeftLegInc":
                changeMechStats("legLeftArmor", "increase", "leg");
                break;
            case "LeftLegDec":
                changeMechStats("legLeftArmor", "decrease", "leg");
                break;
            case "centerTorsoInc":
                changeMechStats("centerArmor", "increase", "center");
                break;
            case "centerTorsoDec":
                changeMechStats("centerArmor", "decrease", "center");
                break;
            case "headInc":
                changeMechStats("headArmor", "increase", "head");
                break;
            case "headDec":
                changeMechStats("headArmor", "decrease", "head");
                break;
            case "LeftArmInc":
                changeMechStats("armLeftArmor", "increase", "arm");
                break;
            case "LeftArmDec":
                changeMechStats("armLeftArmor", "decrease", "arm");
                break;
            case "RightArmInc":
                changeMechStats("armRightArmor", "increase", "arm");
                break;
            case "RightArmDec":
                changeMechStats("armRightArmor", "decrease", "arm");
                break;
            default:
                break;
        }
    });

    // INITIAL PAGE LOAD, data has already been fetch from express/pug template as fullMechData

    // Build armor plots for mech
    displayArmorSection("mechArmor", fullMechData);
    changeMechInternalTonnage(fullMechData.mechs_maxTonnage);
});

function saveMech(saveString, mechJSON) {
    $.ajax({
        url: "/design/" + saveString,
        type: "POST",
        data: JSON.stringify(mechJSON),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response);

            if (typeof response === "object" && response?.message === "Mech saved/updated successfully") {
                // Re-render / reload page with mech id
                alert("Mech saved/updated successfully");
                window.open("/design/" + response?.fullMechData?._id || fullMechData._id, "_self");
            } else {
                alert("Failed to save mech");
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

function changeMechStats(armorLocation, incDec, armorUpdateID) {
    var linked = "yes";
    if (!$("#mirrorArmorBox").is(":checked")) {
        linked = "no";
    }

    // Fetch the necessary data from the fullMechData object
    let maxTonnage = fullMechData.mechs_maxTonnage;

    let tonArmor = armorCharts[maxTonnage];
    let maxTorsoArmor = tonArmor.torsoMax;
    let maxArmArmor = tonArmor.armMax;
    let maxLegArmor = tonArmor.legMax;
    let maxCenterArmor = tonArmor.centerTorsoMax;

    let armorLocation2;
    let altArmorLocation;
    let altArmorLocation2;
    let maxArmor;
    let revAltArmor = 0;

    if (armorLocation == "torsoLeftArmor") {
        maxArmor = maxTorsoArmor;
        altArmorLocation = "torsoRightArmor";
        revAltArmor = fullMechData.mechexternalarmor_rearLeftTorsoArmor;
        armorLocation2 = "rearLeftTorsoArmor";
        altArmorLocation2 = "rearRightTorsoArmor";
    } else if (armorLocation == "torsoRightArmor") {
        maxArmor = maxTorsoArmor;
        altArmorLocation = "torsoLeftArmor";
        revAltArmor = fullMechData.mechexternalarmor_rearRightTorsoArmor;
        armorLocation2 = "rearRightTorsoArmor";
        altArmorLocation2 = "rearLeftTorsoArmor";
    } else if (armorLocation == "legLeftArmor") {
        maxArmor = maxLegArmor;
        altArmorLocation = "legRightArmor";
    } else if (armorLocation == "legRightArmor") {
        maxArmor = maxLegArmor;
        altArmorLocation = "legLeftArmor";
    } else if (armorLocation == "armLeftArmor") {
        maxArmor = maxArmArmor;
        altArmorLocation = "armRightArmor";
    } else if (armorLocation == "armRightArmor") {
        maxArmor = maxArmArmor;
        altArmorLocation = "armLeftArmor";
    } else if (armorLocation == "rearLeftTorsoArmor") {
        maxArmor = maxTorsoArmor;
        altArmorLocation = "rearRightTorsoArmor";
        revAltArmor = fullMechData.mechexternalarmor_torsoLeftArmor;
        armorLocation2 = "torsoLeftArmor";
        altArmorLocation2 = "torsoRightArmor";
    } else if (armorLocation == "rearRightTorsoArmor") {
        maxArmor = maxTorsoArmor;
        altArmorLocation = "rearLeftTorsoArmor";
        revAltArmor = fullMechData.mechexternalarmor_torsoRightArmor;
        armorLocation2 = "torsoRightArmor";
        altArmorLocation2 = "torsoLeftArmor";
    } else if (armorLocation == "centerArmor") {
        maxArmor = maxCenterArmor;
        revAltArmor = fullMechData.mechexternalarmor_rearCenterArmor;
        linked = "no";
        armorLocation2 = "rearCenterArmor";
    } else if (armorLocation == "rearCenterArmor") {
        maxArmor = maxCenterArmor;
        revAltArmor = fullMechData.mechexternalarmor_centerArmor;
        linked = "no";
        armorLocation2 = "centerArmor";
    } else if (armorLocation == "headArmor") {
        maxArmor = 9;
        linked = "no";
    }

    let armorLocationMod = 1;
    if (incDec == "decrease") {
        if (fullMechData["mechexternalarmor_" + armorLocation] > 1) {
            armorLocationMod = -1;
        } else {
            armorLocationMod = 0;
        }
    }

    if (fullMechData["mechexternalarmor_" + armorLocation] < maxArmor) {
        updateArmor(armorLocation, armorLocationMod, linked, altArmorLocation);
    } else if (fullMechData["mechexternalarmor_" + armorLocation] >= maxArmor && incDec == "decrease") {
        updateArmor(armorLocation, armorLocationMod, linked, altArmorLocation);
    }

    if (revAltArmor) {
        let armorThis = fullMechData["mechexternalarmor_" + armorLocation];

        if (revAltArmor + armorThis > maxArmor) {
            updateArmor(armorLocation2, -1, linked, altArmorLocation2);
        }

        if (altArmorLocation2) {
            revAltArmor = fullMechData["mechexternalarmor_" + altArmorLocation2];
            armorThis = fullMechData["mechexternalarmor_" + altArmorLocation];

            if (revAltArmor + armorThis > maxArmor) {
                updateArmor(altArmorLocation2, -1, linked, armorLocation2);
            }
        }
    }

    function updateArmor(armorLocation, armorLocationMod, linked, altArmorLocation) {
        fullMechData["mechexternalarmor_" + armorLocation] =
            fullMechData["mechexternalarmor_" + armorLocation] + armorLocationMod;

        if (linked == "yes") {
            fullMechData["mechexternalarmor_" + altArmorLocation] = fullMechData["mechexternalarmor_" + armorLocation];
        }
    }

    fullMechData.mechexternalarmor_mechArmorTotal =
        fullMechData.mechexternalarmor_torsoLeftArmor +
        fullMechData.mechexternalarmor_torsoRightArmor +
        fullMechData.mechexternalarmor_legLeftArmor +
        fullMechData.mechexternalarmor_legRightArmor +
        fullMechData.mechexternalarmor_armLeftArmor +
        fullMechData.mechexternalarmor_armRightArmor +
        fullMechData.mechexternalarmor_rearLeftTorsoArmor +
        fullMechData.mechexternalarmor_rearRightTorsoArmor +
        fullMechData.mechexternalarmor_centerArmor +
        fullMechData.mechexternalarmor_rearCenterArmor +
        fullMechData.mechexternalarmor_headArmor;

    displayArmorSection("mechArmor", fullMechData);
    updateTonnage();
}

function updateTonnage() {
    let internalWeight = fullMechData.mechinternals_totalInternalTonnage;
    let externalArmor = fullMechData.mechexternalarmor_mechArmorTotal;
    let maxTonnage = fullMechData.mechs_maxTonnage;

    // IS mechs can have FF armor but most don't - just assume standard armor
    let armorType = fullMechData.mechs_techBase === "Inner-Sphere" ? "Standard" : "Ferro-Fibrous";

    let externalArmorWeight = calculateArmorWeight(externalArmor, fullMechData.mechs_techBase, armorType);

    let totalWeight =
        parseFloat(externalArmorWeight, 10) +
        parseFloat(internalWeight, 10) +
        parseFloat(fullMechData.mechinternals_weaponTonnage, 10);

    console.log({
        externalArmorWeight,
        internalWeight,
        mechinternals_weaponTonnage: fullMechData.mechinternals_weaponTonnage,
        totalWeight,
    });

    let internalStrucPtsToUse =
        fullMechData.mechs_techBase === "Clan" ? clanMechInternalStructurePoints : isMechInternalStructurePoints;
    internalStrucPtsToUse = internalStrucPtsToUse[maxTonnage];

    $("#torsoLeftInt").html(internalStrucPtsToUse.sideTorso);
    $("#torsoRightInt").html(internalStrucPtsToUse.sideTorso);
    $("#legRightInt").html(internalStrucPtsToUse.legs);
    $("#legLeftInt").html(internalStrucPtsToUse.legs);
    $("#centerArmorInt").html(internalStrucPtsToUse.centerTorso);
    $("#headArmorInt").html(internalStrucPtsToUse.head);
    $("#armLeftInt").html(internalStrucPtsToUse.arms);
    $("#armRightInt").html(internalStrucPtsToUse.arms);

    if (totalWeight > maxTonnage) {
        document.getElementById("totalWeight").style.color = "red";
        document.getElementById("totalWeightArmorPage").style.color = "red";
    } else {
        document.getElementById("totalWeight").style.color = "white";
        document.getElementById("totalWeightArmorPage").style.color = "black";
    }

    document.getElementById("totalWeight").innerHTML =
        "<strong>Current Tonnage:</strong> " + totalWeight + "/" + maxTonnage;
    document.getElementById("totalWeightArmorPage").innerHTML =
        "<strong>Current Tonnage:</strong> " + totalWeight + "/" + maxTonnage;
}

function calculateArmorWeight(armorPoints, techBase = "Clan", armorType = "Ferro-Fibrous") {
    // Weight per point of armor based on armor type and tech base
    const armorWeightPerPoint = {
        "Inner-Sphere": {
            Standard: 1 / 16, // 16 points per ton
            "Ferro-Fibrous": 1 / 18.5, // 18.5 points per ton
        },
        Clan: {
            Standard: 1 / 16, // 16 points per ton
            "Ferro-Fibrous": 1 / 20, // 20 points per ton
        },
    };

    // Validate input
    if (!armorWeightPerPoint[techBase] || !armorWeightPerPoint[techBase][armorType]) {
        throw new Error("Invalid tech base or armor type");
    }

    const weightPerPoint = armorWeightPerPoint[techBase][armorType];
    const armorWeight = armorPoints * weightPerPoint;

    // Return the weight rounded up to the nearest 0.5 tons (BattleTech rounding)
    return Math.ceil(armorWeight * 2) / 2;
}

function changeMechInternalTonnage(mechWeight) {
    fullMechData.mechs_maxTonnage = mechWeight;

    let walkSpeed = parseInt($("#mechWalk").find(".movementValues").val(), 10);

    // Calculate the engine rating
    const engineRating = mechWeight * walkSpeed;

    // Engine Weight and Criticals
    let engineWeight, engineCrits;
    if (fullMechData.mechengine_engineName === "Fusion Engine") {
        engineWeight = getFusionEngineWeight(engineRating);
        engineCrits = 6; // 2 in each torso section
    } else if (fullMechData.mechengine_engineName === "XL Engine") {
        engineWeight = getXLEngineWeight(engineRating);
        engineCrits = 12; // 4 in each torso section
    }

    // Gyro Weight
    let gyroWeight = getGyroWeight(engineRating);
    const gyroCrits = 4; // Standard gyro

    // Cockpit Weight
    const cockpitWeight = 3; // Fixed for all mechs
    const cockpitCrits = 1;

    // Heat Sink Weight
    const extraHeatSinkWeight = Math.max(fullMechData.mechinternals_heatSinksNum - 10, 0);
    let heatSinkCrits = Math.max(0, parseFloat(fullMechData.mechinternals_heatSinksNum, 10) - 10);
    heatSinkCrits = fullMechData.mechs_techBase === "Clan" ? heatSinkCrits : heatSinkCrits * 3;

    // Optional Jump Jets (if applicable) - Technically not accurate to just set 1 ton for jump-jets but works for most mechs
    const jumpJetWeight = parseFloat(parseInt($("#mechJump").find(".movementValues").val(), 10), 10);

    const structureType = fullMechData.mechinternals_internalStructureType || "Standard";
    const internalStructure = Math.round(
        calculateInternalStructureWeight(mechWeight, structureType, fullMechData.mechs_techBase)
    );

    // Total Internal Tonnage (including all components)
    const totalInternalTonnage =
        internalStructure + engineWeight + gyroWeight + cockpitWeight + extraHeatSinkWeight + jumpJetWeight;

    // Update mech data
    fullMechData.mechinternals_internalStructureTonnage = internalStructure.toFixed(1);
    fullMechData.mechinternals_engineTonnage = engineWeight.toFixed(1);
    fullMechData.mechinternals_gyroTonnage = gyroWeight.toFixed(1);
    fullMechData.mechinternals_cockpitTonnage = cockpitWeight.toFixed(1);
    fullMechData.mechinternals_heatSinksTonnage = extraHeatSinkWeight.toFixed(1);
    fullMechData.mechinternals_jumpJetsTonnage = jumpJetWeight.toFixed(1);

    // Set Total Internal Tonnage
    fullMechData.mechinternals_totalInternalTonnage = totalInternalTonnage.toFixed(1);

    console.log({
        mechWeight,
        engineName: fullMechData.mechengine_engineName,
        heatSinksNum: fullMechData.mechinternals_heatSinksNum,
        internalStructure: internalStructure.toFixed(1),
        engineWeight: engineWeight.toFixed(1),
        gyroWeight: gyroWeight.toFixed(1),
        cockpitWeight: cockpitWeight.toFixed(1),
        extraHeatSinkWeight: extraHeatSinkWeight.toFixed(1),
        jumpJetWeight: jumpJetWeight.toFixed(1),
        totalInternalTonnage: totalInternalTonnage.toFixed(1),
    });

    updateEngineTonnageJSON();
    updateTonnage();
    clearSlotsOnWeightChange();
    displayAllCrits();
}

// Method to update the heat sink/type/dissipation data
function updateHeatSinksJSON(swapHeatSyncType = false, newHeatSyncNum = -1) {
    let changeMade = false;
    if (swapHeatSyncType === true) {
        fullMechData.mechinternals_heatSinkType =
            fullMechData.mechinternals_heatSinkType === "Singles" ? "Doubles" : "Singles";
        changeMade = true;
    }
    if (newHeatSyncNum !== -1) {
        fullMechData.mechinternals_heatSinksNum = newHeatSyncNum;
        changeMade = true;
    }

    if (changeMade === false) return;

    $("#heatSinkTypeDropDown").val(fullMechData.mechinternals_heatSinkType);
    $("#heatSinkNumDropDown").val(fullMechData.mechinternals_heatSinksNum);
    let heatSinkMulti = $("#heatSinkTypeDropDown").val() === "Singles" ? 1 : 2;
    $("#heatDissipation").html(heatSinkMulti * parseInt($("#heatSinkNumDropDown").val(), 10));

    if (changeMade === true) {
        changeMechInternalTonnage(fullMechData.mechs_maxTonnage);
    }
}

async function updateEngine(updatedEngineChange = false) {
    if (updatedEngineChange !== false && typeof updatedEngineChange === "string") {
        fullMechData.mechengine_engineName = updatedEngineChange;
        fullMechData.mechengine_engineRating = updatedEngineChange === "Fusion Engine" ? 3 : 2;
        $("#mechWalk").find(".movementValues").val(fullMechData.mechengine_mechWalk);
        $("#mechRun").find(".movementValues").val(fullMechData.mechengine_mechRun);
        $("#mechJump").find(".movementValues").val(fullMechData.mechengine_mechJump);
    }

    // Update the DOM
    changeMechInternalTonnage(fullMechData.mechs_maxTonnage);
}

function getFusionEngineWeight(engineRating) {
    return standardEngineWeights[Math.min(engineRating, 400)] || 0;
}

function getXLEngineWeight(engineRating) {
    return xlEngineWeights[Math.min(engineRating, 400)] || 0;
}

function getGyroWeight(engineRating) {
    return gyroWeights[engineRating] || 0;
}

function calculateInternalStructureWeight(mechWeight, structureType = "Standard", techBase = "Clan") {
    // Internal structure weight modifiers
    const internalStructureModifiers = {
        Standard: 1, // 10% of 'Mech weight
        "Endo Steel": 0.5, // 50% of the standard weight
    };

    if (!internalStructureModifiers[structureType]) {
        throw new Error("Invalid internal structure type");
    }

    const baseWeight = mechWeight * 0.1; // 10% of 'Mech weight
    const modifier = internalStructureModifiers[structureType];
    return baseWeight * modifier;
}

function updateEngineTonnageJSON() {
    $("#mechTonnageDropDown").val(fullMechData.mechs_maxTonnage);
    document.getElementById("mechEngineRating").innerHTML = fullMechData.mechengine_engineRating;

    // Tonage
    document.getElementById("internalsTonnage").innerHTML = fullMechData.mechinternals_internalStructureTonnage;
    document.getElementById("engineTonnage").innerHTML = fullMechData.mechinternals_engineTonnage;
    document.getElementById("gyroTonnage").innerHTML = fullMechData.mechinternals_gyroTonnage;
    document.getElementById("cockpitTonnage").innerHTML = fullMechData.mechinternals_cockpitTonnage;
    document.getElementById("heatSinksTonnage").innerHTML = fullMechData.mechinternals_heatSinksTonnage;
    document.getElementById("enhancementsTonnage").innerHTML = fullMechData.mechinternals_enhancementsTonnage;
    document.getElementById("jumpJetsTonnage").innerHTML = fullMechData.mechinternals_jumpJetsTonnage;

    // Crits
    document.getElementById("InternalsCriticalsTableData").innerHTML =
        fullMechData.mechinternals_internalStructureCriticals;
    document.getElementById("engineCriticals").innerHTML = fullMechData.mechinternals_engineCriticals;
    document.getElementById("gyroCriticals").innerHTML = fullMechData.mechinternals_gyroCriticals;
    document.getElementById("cockpitCriticals").innerHTML = fullMechData.mechinternals_cockpitCriticals;
    document.getElementById("heatSinksCriticals").innerHTML = fullMechData.mechinternals_heatSinksCriticals;
    document.getElementById("enhancementsCriticals").innerHTML = fullMechData.mechinternals_enhancementsCriticals;
    document.getElementById("jumpJetsCriticals").innerHTML = fullMechData.mechinternals_jumpJetsCriticals;
}

function buildWeaponLis() {
    weaponArray.forEach((weaponElem) => {
        if (weaponElem.techBase !== fullMechData.mechs_techBase) return;
        if ($(`.wc_` + weaponElem.weaponType).length === 0) return;
        let wLi = `<li class="weaponChildLI" name="${weaponElem.weaponName}">${weaponElem.weaponName}</li>`;
        $(`.wc_` + weaponElem.weaponType).append(wLi);
    });

    $(".weaponChildLI").draggable({
        revert: true,
        revertDuration: 0,
        cursor: "move",
        start: function (event, ui) {
            $(this).toggleClass("draggingWeapon");
            $(this).css("width", "80px");

            mousePos = event.pageX - 224;
            $(this).css("margin-left", mousePos);
        },
        stop: function (event, ui) {
            $(this).toggleClass("draggingWeapon");
            $(this).css("margin-left", "0px");
            $(this).css("width", "auto");
            $(this).css("height", "auto");
        },
    });
}

function updateCrits(mechPart, leftRight, critToAdd, addRemove, containerID, rowIndex = false) {
    let critDetails = getMechPartSlots(mechPart, leftRight);

    let TotalSlotsAvailable = parseInt(Object.keys(critDetails).length, 10);
    let slotsUnused = parseInt(Object.values(critDetails).filter((value) => !Boolean(value)).length, 10);
    let slotsUsed = parseInt(Object.values(critDetails).filter(Boolean).length, 10);
    let tonnageSlotsAvail = parseInt(weaponSlotsAvail()[mechPart], 10);
    let critToAddDetails = dataByWeaponName[critToAdd];
    let critToAddSlots = parseInt(critToAddDetails.slotsRequired, 10);
    let critToAddTons = parseFloat(critToAddDetails.tons, 10);

    if (addRemove === "remove") {
        fullMechData.mechinternals_weaponTonnage -= critToAddTons;

        let critEntryDeleted = false;
        for (let [compKey, slotCompVal] of Object.entries(critDetails)) {
            if (parseInt(compKey.replace(/\D/g, ""), 10) === rowIndex) {
                critDetails[compKey] = "";
                critEntryDeleted = true;
                critToAddSlots--;
            } else if (critEntryDeleted && slotCompVal === "overflow" && critToAddSlots > 0) {
                critDetails[compKey] = "";
            } else if (critEntryDeleted && slotCompVal !== "overflow") {
                break;
            }
        }
        let shiftedSlots = shiftSlots(critDetails);
        for (let [compKey, slotCompVal] of Object.entries(shiftedSlots)) {
            fullMechData[compKey] = slotCompVal;
        }
        displayCrits(containerID, mechPart, leftRight);
        updateTonnage();
    } else if (critToAddSlots <= tonnageSlotsAvail - slotsUsed) {
        fullMechData.mechinternals_weaponTonnage += critToAddTons;

        let critToAddSlotsCopy = critToAddSlots;
        for (let [compKey, slotCompVal] of Object.entries(critDetails)) {
            if (slotCompVal === "" && critToAddSlotsCopy > 0) {
                fullMechData[compKey] = critToAddSlotsCopy === critToAddSlots ? critToAdd : "overflow";
                critToAddSlotsCopy--;
            }
        }
        displayCrits(containerID, mechPart, leftRight);
        updateTonnage();
    }
}

// Re-index weapon slots
function shiftSlots(obj) {
    // Extract all values from the object
    const values = Object.values(obj);

    // Separate non-empty and empty values
    const nonEmpty = values.filter((value) => value !== "");
    const empty = values.filter((value) => value === "");

    // Recombine non-empty and empty values
    const shiftedValues = [...nonEmpty, ...empty];

    // Map shifted values back to the original object keys
    const keys = Object.keys(obj);
    const result = {};
    keys.forEach((key, index) => {
        result[key] = shiftedValues[index];
    });

    return result;
}

/*
    EXAMPLE pageload calls to this function
    displayCrits("leftArmCritTable", "mecharm", 0);
    displayCrits("rightArmCritTable", "mecharm", 1);
    displayCrits("headCritTable", "mechhead", 2);
    displayCrits("leftTorsoCritTable", "mechtorso", 0);
    displayCrits("rightTorsoCritTable", "mechtorso", 1);
    displayCrits("leftLegCritTable", "mechleg", 0);
    displayCrits("rightLegCritTable", "mechleg", 1);
    displayCrits("centerCritTable", "mechtorsocenter", 2);
*/
function displayCrits(idToMod, mechPart, leftRight) {
    let weaponSlotsAvailToEval = weaponSlotsAvail();
    let numUnmovable = weaponSlotsAvailToEval[mechPart];

    const critDetails = getMechPartSlots(mechPart, leftRight);

    var myNode = document.getElementById(idToMod);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    let counter = numUnmovable;
    for (var key in critDetails) {
        var TR = document.createElement("tr");
        TR.className = "dropSlots";
        var TD = document.createElement("td");
        TD.className = "dropSlotsTD";
        TD.innerHTML = critDetails[key];

        if (critDetails[key] == "overflow") {
            TD.innerHTML = "&#8595" + "&nbsp&nbsp&nbsp" + "&#8595" + "&nbsp&nbsp&nbsp" + "&#8595";
            TD.className = "dropSlotsUnmovable";
        }
        if (critDetails[key] == "") {
            TD.className = "dropSlotsUnmovable";
        }
        if (counter > 0) {
            // TD.className = "dropSlotsUnmovable";
            TD.style.backgroundColor = "#FFAC30";
        }

        TD.style.textOverflow = "visible";
        TD.style.whiteSpace = "nowrap";

        document.getElementById(idToMod).appendChild(TR).appendChild(TD);
        counter--;
    }

    // This function has to be called here bc it can only be made
    // droppable after being created.
    makeDroppable();
}

/* Companion function to above - get mech slots available (by weight) */
function weaponSlotsAvail() {
    return mechSlotByWeightClass[returnWeightClass()];
}

function displayAllCrits() {
    displayCrits("leftArmCritTable", "mecharm", 0);
    displayCrits("rightArmCritTable", "mecharm", 1);
    displayCrits("headCritTable", "mechhead", 2);
    displayCrits("leftTorsoCritTable", "mechtorso", 0);
    displayCrits("rightTorsoCritTable", "mechtorso", 1);
    displayCrits("leftLegCritTable", "mechleg", 0);
    displayCrits("rightLegCritTable", "mechleg", 1);
    displayCrits("centerCritTable", "mechtorsocenter", 2);
}

/* When changing weights, remove extra weapons that don't fit */
function clearSlotsOnWeightChange() {
    let weightClass = returnWeightClass();
    let weaponSlotsAvailToEval = mechSlotByWeightClass[weightClass];

    for (let [comp, slotsAvail] of Object.entries(weaponSlotsAvailToEval)) {
        for (let i in [0, 1, 2]) {
            let currentCompCrits = getMechPartSlots(comp, parseInt(i, 10));

            if ($.isEmptyObject(currentCompCrits)) continue;

            let slotCounter = Object.keys(currentCompCrits).length;
            for (let [slotKey, slotVal] of Object.entries(currentCompCrits).reverse()) {
                if (slotCounter > parseInt(slotsAvail, 10)) {
                    fullMechData[slotKey] = "";
                    if (slotVal === "overflow") {
                        slotsAvail = parseInt(slotsAvail, 10) - 1;
                    }
                }
                slotCounter--;
            }
        }
    }
}

/* Companion function to above - get mech weight class */
function returnWeightClass(mechWeightPassed = "") {
    let foundMechWeight = mechWeightPassed ? mechWeightPassed : fullMechData.mechs_maxTonnage;
    foundMechWeight = parseInt(foundMechWeight, 10);
    if (foundMechWeight >= 85) return "Assault";
    else if (foundMechWeight >= 65) return "Heavy";
    else if (foundMechWeight >= 40) return "Medium";
    else return "Light";
}

function getMechPartSlots(mechPart, leftRight) {
    let leftRightMod = "";
    if (leftRight === 0) {
        leftRightMod = "Left";
    } else if (leftRight === 1) {
        leftRightMod = "Right";
    }
    let finalPrefix = mechPart + leftRightMod + "_";

    const critDetailsUnsorted = Object.fromEntries(
        Object.entries(fullMechData).filter((key, val) => {
            return key[0].indexOf(finalPrefix) === 0 && key[0].includes("_slot");
        })
    );

    const sortedKeys = Object.keys(critDetailsUnsorted).sort((a, b) => {
        const numA = parseInt(a.match(/slot(\d+)/)[1], 10);
        const numB = parseInt(b.match(/slot(\d+)/)[1], 10);
        return numA - numB;
    });

    // Rebuild the object with sorted keys
    const critDetails = Object.fromEntries(sortedKeys.map((key) => [key, critDetailsUnsorted[key]]));

    return critDetails;
}

// THIS FUNCTION MAKES THE CRIT CONTAINERS DROPPABLE BUT HAS TO BE CALLED AFTER
// THOSE CONTAINERS ARE MADE DYNAMICALLY.
function makeDroppable() {
    $(".dropSlots").droppable({
        tolerance: "pointer",
        accept: ".weaponChildLI",

        drop: function (event, ui) {
            ui.draggable.data("dropped", true);

            containerID = $(this).parent().attr("id");
            if (containerID == "headCritTable") {
                modLocation = "mechhead";
                altLocation = 2;
            } else if (containerID == "leftArmCritTable") {
                modLocation = "mecharm";
                altLocation = 0;
            } else if (containerID == "rightArmCritTable") {
                modLocation = "mecharm";
                altLocation = 1;
            } else if (containerID == "leftTorsoCritTable") {
                modLocation = "mechtorso";
                altLocation = 0;
            } else if (containerID == "rightTorsoCritTable") {
                modLocation = "mechtorso";
                altLocation = 1;
            } else if (containerID == "centerCritTable") {
                modLocation = "mechtorsocenter";
                altLocation = 2;
            } else if (containerID == "leftLegCritTable") {
                modLocation = "mechleg";
                altLocation = 0;
            } else if (containerID == "rightLegCritTable") {
                modLocation = "mechleg";
                altLocation = 1;
            }

            updateCrits(modLocation, altLocation, $(ui.draggable).html(), "add", containerID);
        },
    });

    $(".dropSlotsTD").draggable({
        revert: true,
        revertDuration: 0,
        cursor: "move",
        start: function (event, ui) {
            $(this).toggleClass("draggingWeapon");
            $(this).css("display", "block");
        },
        stop: function (event, ui) {
            $(this).toggleClass("draggingWeapon");
            const rowIndex = parseInt($(this).parent().index(), 10) + 1;

            containerID = $(this).parent().parent().attr("id");
            if (containerID == "headCritTable") {
                modLocation = "mechhead";
                altLocation = 2;
            } else if (containerID == "leftArmCritTable") {
                modLocation = "mecharm";
                altLocation = 0;
            } else if (containerID == "rightArmCritTable") {
                modLocation = "mecharm";
                altLocation = 1;
            } else if (containerID == "leftTorsoCritTable") {
                modLocation = "mechtorso";
                altLocation = 0;
            } else if (containerID == "rightTorsoCritTable") {
                modLocation = "mechtorso";
                altLocation = 1;
            } else if (containerID == "centerCritTable") {
                modLocation = "mechtorsocenter";
                altLocation = 2;
            } else if (containerID == "leftLegCritTable") {
                modLocation = "mechleg";
                altLocation = 0;
            } else if (containerID == "rightLegCritTable") {
                modLocation = "mechleg";
                altLocation = 1;
            }

            updateCrits(modLocation, altLocation, $(this).html(), "remove", containerID, rowIndex);
            $(this).remove();
        },
    });
}

/* JSON obj diffing function useful for debugging */
function diffObjects(obj1, obj2) {
    const diff = {};

    // Check keys in obj1
    for (const key in obj1) {
        // If value changed or key doesn't exist in obj2
        if (obj1[key] !== obj2[key]) {
            diff[key] = { oldValue: obj1[key], newValue: obj2[key] };
        }
    }

    // Check for new keys in obj2
    for (const key in obj2) {
        if (!(key in obj1)) {
            diff[key] = { oldValue: undefined, newValue: obj2[key] };
        }
    }

    return diff;
}
