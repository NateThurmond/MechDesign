var express = require("express");
var router = (module.exports = express.Router());

/* GET design page. */
router.get("/", function (req, res) {
    mechMod.findAllBaseMechs(function (error, docs) {
        mechMod.findAllCustomMechs(req.cookies.userName, function (err, documents) {
            if (req.cookies.userName == null) {
                documents = {};
            }

            res.render("design.pug", {
                title: "Create your mech",
                link2class: "linkHighlight",
                welcomeSec: "Welcome, " + req.cookies.userName,
                mechs: docs,
                customMechs: documents,
                fullMechData: {},
            });
        });
    });
});

/* List mechs for choosing */
router.get("/mechs/list", function (req, res) {
    mechMod.listAllBaseMechs(function (err, mechs) {
        res.json(mechs);
    });
});

/* GET mech for design page. */
router.get("/:id", function (req, res) {
    mechMod.findById(req.params.id, function (error, selectedMech) {
        // Just return the data
        // res.json(selectedMech);

        // Render the page for the specific mech specified
        res.render("design.pug", {
            title: "Create your mech",
            link2class: "linkHighlight",
            welcomeSec: "Welcome, " + req.cookies.userName,
            mechs: [selectedMech],
            customMechs: [selectedMech],
            fullMechData: selectedMech,
        });
    });
});

/* GET mech by name design page. */
router.get("/mechName/:mechName", function (req, res) {
    mechMod.findByName(req.params.mechName, function (error, selectedMech) {
        res.json(selectedMech);
    });
});

/* POST new mech for design page. */
router.post("/saveNew/", function (req, res) {
    mech = req.body;

    mechMod.save(mech, function (error, response) {
        res.json(response);
    });
});

/* POST to delete mech. */
router.post("/removeMech/:mechName", function (req, res) {
    mechMod.removeMech(req.params.mechName, function (error, response) {
        res.json(response);
    });
});

/* POST save existing mech for design page. */
router.post("/save/", function (req, res) {
    mech = req.body;

    mechMod.patch(mech, function (error, response) {
        res.json(response);
    });
});
