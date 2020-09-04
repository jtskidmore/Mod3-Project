# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)





human = Type.create(name: "Human", strength: "intuition", weakness: "soft outer-shell")
wookie = Type.create(name: "Wookie", strength: "brute force", weakness: "can't speak english")
alien = Type.create(name: "Alien", strength: "masters of the force", weakness: "smallish")



# leia = Player.create(name: "Leia", health: 100, defense: 50, attack: 75, score: 0, type_id: 1)
# han = Player.create(name: "Han", health: 100, defense: 50, attack: 75, score: 0, type_id: 1)
# yoda = Player.create(name: "Yoda", health: 100, defense: 50, attack: 75, score: 0, type_id: 3)
# chewie = Player.create(name: "Chewie", health: 100, defense: 50, attack: 75, score: 0, type_id: 2)
# jarjar = Player.create(name: "Jar-Jar Binks", health: 5, defense: 50, attack: 75, score: 0, type_id: 3)


lightsaber = Weapon.create(name: "lightsaber", damage: "40")
blaster = Weapon.create(name: "blaster", damage: "20")
pulse_cannon = Weapon.create(name: "pulse cannon", damage: "50")
spear = Weapon.create(name: "spear", damage: "10")

minor_healing = Potion.create(name: "minor healing", health_points: 20)
major_healing = Potion.create(name: "major healing", health_points: 40)

luke = Player.create(name: "Luke", health: 100, defense: 50, attack: 75, score: 0, type_id: 1, weapon_id: 1, potion_id: 1)
