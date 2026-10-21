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
	for id in ["espada_basica", "lanca_basica", "espada_gemea", "machado", "arco_curto"]:
		var danos := []
		for n in range(1,6): danos.append(equipamentos.armas[id].niveis[n].dano)
		armas.append({"id":id,"nome":equipamentos.armas[id].nome,"dano":danos,"dias":forja.dias_fabricacao(id),"materiais":forja.RECEITAS[id],"meta":forja.onda_receita(id)})
	var andares := []
	for n in range(1,12):
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
	var dados := {"armas":armas,"andares":andares,"peixes":capturas,"refeicoes":refeicoes,"receitas":receitas,
		"moradores":{},"energia":root.get_node("Fazenda").ENERGIA_MAXIMA}
	for id in cidade.MORADORES:
		var d: Dictionary = cidade.MORADORES[id]
		dados.moradores[id] = {"nome":d.nome,"oficio":d.oficio,"casa":d.casa,"fala":d.fala,"horario":cidade.HORARIOS.get(id,[]),"folga":cidade.FOLGAS.get(id,-1)}
	var arquivo := FileAccess.open(OS.get_cmdline_user_args()[0],FileAccess.WRITE)
	arquivo.store_string(JSON.stringify(dados,"  ")+"\n")
	print("WIKI: ",armas.size()," armas, ",receitas.size()," receitas, ",capturas.size()," peixes, ",refeicoes.size()," pratos, ",andares.size()," mapas.")
	equipamentos.free()
	quit()
