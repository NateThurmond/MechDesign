var mongodb = require("mongodb");
var monk = require("monk");

mechMod = function () {
    this.db = monk(process.env.MONGO_URI);
    this.collection = this.db.get("mechs");

    this.setCollection = function (collection) {
        this.collection = this.db.get(collection);
    };
};

mechMod.prototype.listAllBaseMechs = function (callback) {
    this.collection.find(
        { baseMech: 1 },
        {
            projection: {
                mechs_mechID: 1,
                mechs_mechName: 1,
                mechs_armor: 1,
                mechs_maxTonnage: 1,
                mechs_introDate: 1,
                mechs_mechModel: 1,
                mechs_era: 1,
                mechs_techBase: 1,
                mechs_productionYear: 1,
                mechengine_mechWalk: 1,
            },
        },
        function (error, results) {
            if (error) callback(error);
            else callback(null, results);
        }
    );
};

mechMod.prototype.findAllBaseMechs = function (callback) {
    this.collection.find({ baseMech: 1 }, {}, function (error, results) {
        if (error) callback(error);
        else callback(null, results);
    });
};

mechMod.prototype.findAllCustomMechs = function (userName, callback) {
    this.collection.find({ userName: userName }, {}, function (error, results) {
        if (error) callback(error);
        else callback(null, results);
    });
};

mechMod.prototype.findById = function (id, callback) {
    this.collection.findOne({ _id: id }, function (error, result) {
        if (error) callback(error);
        else callback(null, result);
    });
};

mechMod.prototype.findByName = function (name, callback) {
    this.collection.findOne({ mechName: name }, function (error, result) {
        if (error) callback(error);
        else callback(null, result);
    });
};

mechMod.prototype.removeMech = function (mechID, callback) {
    mechMod.findById(mechID, function (error, selectedMech) {
        // Only delete if the mech is not a base mech
        if (selectedMech["baseMech"]) {
            callback(null, "Cannot delete a base mech");
        } else {
            mechMod.collection.remove({ _id: mechID }, function (error, result) {
                if (error) callback(error);
                else callback(null, "Mech Deleted");
            });
        }
    });
};

/* Older method that needs some rework before use but does contain useful references */
mechMod.prototype.save = function (mech, callback) {
    if (mech == null) {
        console.log("error: no mech data sent to mechMod.save");
        callback(null, "Error saving mech");
    } else {
        if (mech["userName"] == null) {
            callback(null, "Must be logged in to save mechs");
        } else {
            createDate = new Date();
            result = JSON.stringify(createDate);
            mech.created_on = result.substring(1, result.length - 1);
            delete mech["_id"];
            this.collection.insert(mech, function () {
                callback(null, "Created new mech");
            });
        }
    }
};

/* Older method that needs some rework before use but does contain useful references */
mechMod.prototype.patch = function (mech, callback) {
    if (mech == null) {
        console.log("error: no mech data sent to mechMod.patch");
        callback(null, "Error saving mech");
    } else {
        mechMod.findById(mech._id, function (error, selectedMech) {
            // Only save if the mech is not a base mech
            if (selectedMech["baseMech"]) {
                callback(null, "Cannot save over a base mech");
            } else {
                mechMod.collection.update(
                    { _id: mech._id },
                    { weight: mech.weight, speed: mech.speed, mechName: mech.mechName, userName: mech.userName },
                    function (error, mech) {
                        if (error) callback(error);
                        else callback(null, "Mech Details Saved");
                    }
                );
            }
        });
    }
};

mechMod.prototype.saveMech = async function (mechData, callback) {
    try {
        // Remove _id to avoid conflicts during upsert
        delete mechData._id;

        // Build the query
        const query = {
            mechs_mechModel: mechData.mechs_mechModel,
            mechs_mechName: mechData.mechs_mechName,
        };
        const update = {
            $set: mechData,
        };

        // upsert: true => If no document matches query, create a new doc.
        const options = {
            upsert: true,
        };

        // Upsert to mongoo
        const result = await this.collection.findOneAndUpdate(query, update, options);

        callback(null, result);
    } catch (error) {
        callback(error);
    }
};

exports.mechMod = mechMod;
