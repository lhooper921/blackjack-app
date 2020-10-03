/*module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define("something", {
    // Giving the Author model a name of type STRING
  });

  Author.associate = function(models) {
    // Associating something1 with something2

    Author.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Author;
}; */
