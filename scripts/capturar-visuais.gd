extends SceneTree
## Executar somente na cópia de testes, com saída explícita fora do jogo.
var saida: String
func _initialize(): rodar.call_deferred()
func esperar(n := 6):
	for i in n: await process_frame
func foto(vp: Viewport, nome: String):
	await esperar(3)
	await RenderingServer.frame_post_draw
	assert(vp.get_texture().get_image().save_png(saida+"/"+nome+".png")==OK)
func preparar_descarte():
	if current_scene==null: return
	for esqueleto in current_scene.find_children("*","Skeleton3D",true,false):
		for ligacao in esqueleto.get_signal_connection_list("skeleton_updated"):
			if ligacao.callable.get_method()=="_atualizar_inclinacao":
				esqueleto.disconnect("skeleton_updated",ligacao.callable)
func rodar():
	assert(OS.get_user_data_dir().get_file().begins_with("AlgoLand testes"))
	assert(DisplayServer.get_name()!="headless")
	saida=OS.get_cmdline_user_args()[0]
	DirAccess.make_dir_recursive_absolute(saida+"/heroi")
	DirAccess.make_dir_recursive_absolute(saida+"/visuais")
	DirAccess.make_dir_recursive_absolute(saida+"/conjuntos")
	DirAccess.make_dir_recursive_absolute(saida+"/armas")
	DirAccess.make_dir_recursive_absolute(saida+"/cenarios")
	root.get_node("Ranking").conexao_habilitada=false
	root.get_node("Introducao").pular_prologo()
	root.get_node("Transicao").hora_salva=12.0
	root.size=Vector2i(1152,648)
	root.content_scale_size=Vector2i(576,324)
	change_scene_to_file("res://cenas/fazenda.tscn")
	await esperar(45)
	root.get_node("Transicao").limpar()
	var j=current_scene.get_node("Jogador")
	j.set_physics_process(false)
	j.no_fazenda.set_process(false)
	var h=j.get_node("HeroiBase3D")
	h.set_process(false)
	h._empunhadura_lanca.amostragem_automatica=false
	h._acao="parado"
	j.aparencia_raven={"pele":0,"cor":[1.0,1.0,1.0,1.0],"olhos":0}
	h._aplicar_cores()
	h._espada.visible=false
	h._escudo.visible=false
	h._lanca.visible=false
	h.definir_roupas_3d(h.CATALOGO_ROUPAS.padrao())
	var vp:=SubViewport.new()
	vp.size=h._vp.size
	vp.transparent_bg=true
	vp.world_2d=World2D.new()
	vp.render_target_update_mode=SubViewport.UPDATE_ALWAYS
	root.add_child(vp)
	var sprite:=Sprite2D.new()
	sprite.centered=false
	sprite.texture=h._vp.get_texture()
	sprite.material=h._sprite.material
	sprite.texture_filter=h._sprite.texture_filter
	vp.add_child(sprite)
	# Mantém a moldura e o pivô em todos os quadros; inclui o shader usado no jogo.
	var folha:=Image.create(80*12,96,false,Image.FORMAT_RGBA8)
	folha.fill(Color.TRANSPARENT)
	var duracao: float=h._player.get_animation(h._nome_animacao("correr")).length
	for q in 12:
		h._modelo.rotation.y=0.0
		h._player.play(h._nome_animacao("correr"),0)
		h._player.pause()
		h._player.seek(duracao*q/12.0,true)
		await esperar(3)
		await RenderingServer.frame_post_draw
		var img: Image=vp.get_texture().get_image()
		if q==0: print("QUADRO: ",img.get_size()," conteúdo ",img.get_used_rect()," ciclo ",duracao)
		folha.blit_rect(img,Rect2i(40,32,80,96),Vector2i(q*80,0))
	assert(folha.save_png(saida+"/heroi/atual.png")==OK)
	h._player.play("Idle_Loop",0)
	h._player.pause()
	h._player.seek(0,true)
	for categoria in h.CATALOGO_ROUPAS.CATEGORIAS:
		for modelo in h.CATALOGO_ROUPAS.MODELOS[categoria]:
			var visual: Dictionary=h.CATALOGO_ROUPAS.padrao()
			visual[categoria]=modelo.id
			h.definir_roupas_3d(visual)
			await foto(vp,"visuais/"+modelo.id)
	# Ícones dos itens reais, inclusive conjuntos ainda sem malha própria no visual 3D.
	var Item=load("res://codigo/modelos/dados_item.gd")
	var equipados_antes: Dictionary=j.inventario.equipados.duplicate()
	for c in load("res://codigo/dados/conjuntos_armadura.gd").CONJUNTOS:
		for tipo in c.TIPOS:
			var item=Item.de_dict({"tipo":tipo,"nivel":1,"raridade":c.RARIDADE,"categoria":c.TIPOS[tipo].slot})
			item.icone=load("res://codigo/ui/icones_itens.gd").obter(item,self)
			assert(item.icone!=null,"Ícone real: "+tipo)
			assert(item.icone.get_image().save_png(saida+"/conjuntos/"+tipo+".png")==OK)
		if c.RAIZ_SPRITES in h._armaduras.RAIZES:
			j.roupa_atual=0
			j.pecas_cavaleiro=0
			for tipo in c.TIPOS:
				var slot: String=c.TIPOS[tipo].slot
				j.inventario.equipados[slot]=Item.de_dict({"tipo":tipo,"nivel":1,"raridade":c.RARIDADE,"categoria":slot})
			h._armaduras.atualizar()
			await foto(vp,"visuais/conjunto_"+c.ID)
	j.inventario.equipados=equipados_antes
	h._armaduras.atualizar()
	for tipo in load("res://codigo/dados/armas_montantes.gd").MODELOS:
		var item=Item.de_dict({"tipo":tipo,"nivel":1,"raridade":"comum","categoria":"arma"})
		item.icone=load("res://codigo/ui/icones_itens.gd").obter(item,self)
		assert(item.icone.get_image().save_png(saida+"/armas/"+tipo+".png")==OK)
	sprite.texture=null
	vp.queue_free()
	await esperar(2)
	for cena in ["cidade","fazenda","praia","floresta"]:
		preparar_descarte()
		change_scene_to_file("res://cenas/"+cena+".tscn")
		await esperar(45)
		j=current_scene.get_node("Jogador")
		j.set_physics_process(false)
		j.visible=false
		var camera: Camera2D=j.camera
		camera.position_smoothing_enabled=false
		camera.set_as_top_level(true)
		camera.limit_enabled=false
		camera.zoom=Vector2.ONE
		camera.global_position=Vector2(352,288) if cena=="cidade" else Vector2(400,300)
		camera.reset_smoothing()
		for hud in get_nodes_in_group("hud"): hud.hide()
		if current_scene.has_node("Interface"): current_scene.get_node("Interface").hide()
		var luz=current_scene.get_node_or_null("Iluminacao")
		if luz!=null:
			luz.hora=12.0
			luz.set_process(false)
			luz._aplicar()
		for e in 4:
			root.get_node("Calendario").dia=e*root.get_node("Calendario").DIAS_POR_ESTACAO+1
			root.get_node("Calendario").estacao_mudou.emit(e)
			var estacoes=current_scene.get_node_or_null("Terrains/Estacoes")
			if estacoes!=null: estacoes.definir_estacao(e,true)
			await esperar(20)
			await foto(root,"cenarios/"+("vila" if cena=="cidade" else cena)+"_"+["primavera","verao","outono","inverno"][e])
	print("WIKI VISUAL: herói, roupas, itens e quatro cenários nas quatro estações exportados do Godot.")
	preparar_descarte()
	quit()
