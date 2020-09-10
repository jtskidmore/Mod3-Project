# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)





human = Type.create(name: "Human", strength: "intuition", weakness: "soft outer-shell")
wookie = Type.create(name: "Wookie", strength: "brute force", weakness: "can't speak english")
gungan = Type.create(name: "Gungan", strength: "brute force", weakness: "can't speak english")
jawa = Type.create(name: "Jawa", strength: "brute force", weakness: "can't speak english")
mandalorian = Type.create(name: "Mandalorian", strength: "brute force", weakness: "can't speak english")
droid = Type.create(name: "Droid", strength: "brute force", weakness: "can't speak english")







lightsaber = Weapon.create(name: "lightsaber", damage: "30")
double_sided_lightsaber = Weapon.create(name: "double sided lightsaber", damage: 35)
blaster = Weapon.create(name: "blaster", damage: "20")
blaster_rifle = Weapon.create(name: "blaster rifle", damage: "25")
pulse_cannon = Weapon.create(name: "pulse cannon", damage: "35")
spear = Weapon.create(name: "spear", damage: "15")
slugthrower = Weapon.create(name: "slugthrower", damage: "20")
gaderffii_stick = Weapon.create(name: "gaderffii stick", damage: "20")
force_lighting = Weapon.create(name: 'force lighting', damage: "35")

minor_healing = Potion.create(name: "minor healing", health_points: 20)
major_healing = Potion.create(name: "major healing", health_points: 40)
none = Potion.create(name: "none", health_points: nil)


tatooine = Planet.create(name:"Tatooine", environment:"desert", point_value:200)
naboo = Planet.create(name:"Naboo", environment:"earth-like", point_value:200)
kash = Planet.create(name:"Kashyyyk", environment:"rain forest", point_value:200)
alderaan = Planet.create(name:"Alderaan", environment:"earth-like", point_value:200)
coruscant = Planet.create(name:"Coruscant", environment:"ocean", point_value:200)
dagobah = Planet.create(name:"Dagobah", environment:"swamp", point_value:200)
mustafar = Planet.create(name:"Mustafar", environment:"lava", point_value:200)
hoth = Planet.create(name:"Hoth", environment:"frozen", point_value:200)


boba = Npc.create(name:"Boba Fett", health:110, attack:25, defense:220, is_friendly:false, weapon_id:3, potion_id:1, type_id:1)
jango = Npc.create(name:"Jango Fett", health:100, attack:25, defense:200, is_friendly:false, weapon_id:3, potion_id:1, type_id:1)
jabba = Npc.create(name:"Jabba the Hutt", health:60, attack:20, defense:120, is_friendly:false, weapon_id:3, potion_id:1, type_id:1)
darth_vader = Npc.create(name:"Darth Vader", health:140, attack:30, defense:280, is_friendly:false, weapon_id:1, potion_id:1, type_id:1)
darth_maul = Npc.create(name:"Darth Maul", health:120, attack:30, defense:240, is_friendly:false, weapon_id:2, potion_id:1, type_id:1)
darth_sidious = Npc.create(name:"Darth Sidious", health:110, attack:30, defense:220, is_friendly:false, weapon_id:3, potion_id:1, type_id:1)
greedo = Npc.create(name:"Greedo", health:100, attack:25, defense:200, is_friendly:false, weapon_id:3, potion_id:1, type_id:1)

storm_trooper = Npc.create(name:"Storm Trooper", health:70, attack:20, defense:140, is_friendly:false, weapon_id:3, potion_id:1, type_id:1)
storm_trooper2 = Npc.create(name:"Storm Trooper", health:70, attack:20, defense:140, is_friendly:false, weapon_id:4, potion_id:1, type_id:1)
storm_trooper3 = Npc.create(name:"Storm Trooper", health:70, attack:20, defense:140, is_friendly:false, weapon_id:4, potion_id:1, type_id:1)
storm_trooper4 = Npc.create(name:"Storm Trooper", health:70, attack:20, defense:140, is_friendly:false, weapon_id:3, potion_id:1, type_id:1)
storm_trooper5 = Npc.create(name:"Storm Trooper", health:70, attack:25, defense:140, is_friendly:false, weapon_id:4, potion_id:1, type_id:1)
storm_trooper6 = Npc.create(name:"Storm Trooper", health:70, attack:25, defense:140, is_friendly:false, weapon_id:4, potion_id:1, type_id:1)
tusken_raider = Npc.create(name:"Tusken Raider", health:70, attack:20, defense:140, is_friendly:false, weapon_id:8, potion_id:1, type_id:1)
tusken_raider2 = Npc.create(name:"Tusken Raider", health:70, attack:20, defense:140, is_friendly:false, weapon_id:7, potion_id:1, type_id:1)
tusken_raider3 = Npc.create(name:"Tusken Raider", health:70, attack:20, defense:140, is_friendly:false, weapon_id:8, potion_id:1, type_id:1)
tusken_raider4 = Npc.create(name:"Tusken Raider", health:70, attack:20, defense:140, is_friendly:false, weapon_id:7, potion_id:1, type_id:1)
tusken_raider5 = Npc.create(name:"Tusken Raider", health:70, attack:25, defense:140, is_friendly:false, weapon_id:8, potion_id:1, type_id:1)
tusken_raider6 = Npc.create(name:"Tusken Raider", health:70, attack:25, defense:140, is_friendly:false, weapon_id:8, potion_id:1, type_id:1)

lando = Npc.create(name:"Lando Calrissian", health:100, attack:0, defense:0, is_friendly:true, weapon_id:3, potion_id:2, type_id:1)
yoda = Npc.create(name:"Yoda", health:100, attack:0, defense:0, is_friendly:true, weapon_id:1, potion_id:1, type_id:1)
obi_wan = Npc.create(name:"Obi-Wan Kenobi", health:100, attack:0, defense:0, is_friendly:true, weapon_id:1, potion_id:1, type_id:1)
watto = Npc.create(name:"Watto", health:100, attack:0, defense:0, is_friendly:true, weapon_id:5, potion_id:2, type_id:1)
trader2 = Npc.create(name:"A trader", health:100, attack:0, defense:0, is_friendly:true, weapon_id:6, potion_id:1, type_id:1)
trader3 = Npc.create(name:"A trader", health:100, attack:0, defense:0, is_friendly:true, weapon_id:7, potion_id:2, type_id:1)
trader4 = Npc.create(name:"A trader", health:100, attack:0, defense:0, is_friendly:true, weapon_id:8, potion_id:2, type_id:1)


p1 = Player.create(name: "Player 1", health: 100, defense: 50, attack: 75, score: 0, type_id: 1, weapon_id: 1, potion_id: 1)
p2 = Player.create(name: "Player 2", health: 100, defense: 50, attack: 75, score: 0, type_id: 1, weapon_id: 1, potion_id: 1)
p3 = Player.create(name: "Player 3", health: 100, defense: 50, attack: 75, score: 0, type_id: 1, weapon_id: 1, potion_id: 1)
p4 = Player.create(name: "Player 4", health: 100, defense: 50, attack: 75, score: 0, type_id: 1, weapon_id: 1, potion_id: 1)
p5 = Player.create(name: "Player 5", health: 100, defense: 50, attack: 75, score: 0, type_id: 1, weapon_id: 1, potion_id: 1)
