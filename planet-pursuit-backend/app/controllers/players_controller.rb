class PlayersController < ApplicationController

  def index
    players = Player.all
    render :json => players
  end

  def show
    player = Player.find(params[:id])
    render :json => player
  end

  def create
    allWeapons = Weapon.all
    allPotions = Potion.where.not(id: 3)
    puts params

    render :json =>
    Player.create(
      name: params[:name],
      type_id: params[:type_id],
      health: 100,
      defense: 50,
      attack: 75,
      score: 0,
      weapon_id: allWeapons.sample.id,
      potion_id: allPotions.sample.id
    )
  end

  def update
    puts params
    player = Player.find(params[:id])
    player.update(player_params)
    # byebug
    render :json => player
  end

  private

  def player_params
    params.require(:player).permit(:weapon_id, :health, :potion_id, :score)
  end

end
