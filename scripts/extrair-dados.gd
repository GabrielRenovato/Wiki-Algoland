extends SceneTree
## Leitura do código em projeto com saves isolados; não inicia uma partida.
func _initialize() -> void: extrair.call_deferred()
func extrair() -> void:
	assert(OS.get_user_data_dir().get_file().begins_with("AlgoLand testes"))
	var forja = load("res://codigo/dados/forja_armas.gd")
	var equipamentos = load("res://codigo/dados/equipamentos.gd").new()
	var catalogo = load("res://codigo/fendas/catalogo_andares.gd")
	var peixes = load("res://codigo/pesca/peixes.gd")
	var pratos = load("res://codigo/dados/refeicoes.gd")
	var cidade = load("res://codigo/cidade/dados_cidade.gd")
	var armas := []
	for id in ["espada_basica", "lanca_basica", "espada_gemea", "machado", "arco_curto"] + equipamentos.Montantes.MODELOS.keys():
		var danos := []
		for n in range(1,6): danos.append(equipamentos.armas[id].niveis[n].dano)
		armas.append({"id":id,"nome":equipamentos.armas[id].nome,"dano":danos,"dias":forja.dias_fabricacao(id),"materiais":forja.RECEITAS[id],"meta":forja.onda_receita(id)})
	var andares := []
	for n in range(1,catalogo.PLANTAS.size()+1):
		var d: Dictionary = catalogo.dados(n)
		andares.append({"andar":n,"guardiao":d.guardiao_id,"nome":d.get("nome", ""),"bioma":d.bioma})
	var capturas := []
	for id in peixes.DADOS:
		var d: Dictionary = peixes.DADOS[id].duplicate()
		d.merge(peixes.catalogo()[id],true)
		d.id = id
		d.nivel_vara = peixes.nivel_recomendado(id)
		capturas.append(d)
	var refeicoes := []
	for id in pratos.ORDEM:
		var d: Dictionary = pratos.dados(id).duplicate(true)
		d.id = id
		d.texto_bonus = pratos.texto_bonus(id)
		refeicoes.append(d)
	var receitas := []
	for id in forja.receitas_ativas():
		receitas.append({"id":id,"nome":forja.nome(id),"dias":forja.dias_fabricacao(id),"materiais":forja.RECEITAS[id],"meta":forja.onda_receita(id),"livre":id in forja.INICIAIS_LIVRES})
	var pocoes_script = load("res://codigo/dados/pocoes.gd")
	var pocoes := []
	for id in pocoes_script.ORDEM:
		var d: Dictionary = pocoes_script.dados(id).duplicate(true)
		d.id = id
		d.icone = [d.icone.x, d.icone.y]
		d.erase("cor")
		d.receitas = []
		for e in 4:
			var receita: Dictionary = pocoes_script.receita_da_estacao(id,e)
			d.receitas.append(receita.receita.merged(receita.peixes))
		pocoes.append(d)
	var conjuntos := []
	for c in load("res://codigo/dados/conjuntos_armadura.gd").CONJUNTOS:
		conjuntos.append({"id":c.ID,"nome":c.NOME,"raridade":c.RARIDADE,"tipo_bonus":c.TIPO_BONUS,
			"chance":c.CHANCE_BONUS,"duracao":c.DURACAO_BONUS,"recarga":c.RECARGA_BONUS,
			"mult_dano":c.MULT_DANO_BONUS,"defesa":c.BONUS_DEFESA,"vitalidade":c.BONUS_VITALIDADE,
			"meta":forja.onda_receita(c.TIPOS.keys()[0]),"pecas":c.TIPOS.keys()})
	var progresso=root.get_node("Progresso")
	var melhorias := []
	for id in progresso.ORDEM_MELHORIAS:
		var d: Dictionary=progresso.MELHORIAS[id].duplicate()
		d.id=id
		melhorias.append(d)
	var roupas = load("res://codigo/dados/roupas_base_3d.gd").MODELOS
	var dados := {"armas":armas,"andares":andares,"peixes":capturas,"refeicoes":refeicoes,"receitas":receitas,
		"melhorias":melhorias,"custos_melhoria":progresso.CUSTOS_MELHORIA,"andares_melhoria":progresso.ANDARES_MELHORIA,"intervalo_checkpoint":progresso.INTERVALO_CHECKPOINT,"pocoes":pocoes,"conjuntos":conjuntos,"roupas":roupas,"moradores":{},"energia":root.get_node("Fazenda").ENERGIA_MAXIMA}
	for id in cidade.MORADORES:
		var d: Dictionary = cidade.MORADORES[id]
		dados.moradores[id] = {"nome":d.nome,"oficio":d.oficio,"casa":d.casa,"fala":d.fala,"horario":cidade.HORARIOS.get(id,[]),"folga":cidade.FOLGAS.get(id,-1)}
	var arquivo := FileAccess.open(OS.get_cmdline_user_args()[0],FileAccess.WRITE)
	arquivo.store_string(JSON.stringify(dados,"  ")+"\n")
	print("WIKI: ",armas.size()," armas, ",receitas.size()," receitas, ",capturas.size()," peixes, ",refeicoes.size()," pratos, ",andares.size()," mapas.")
	equipamentos.free()
	quit()
