export interface ClassicNode {
  id: string;
  label: string;
  desc: string;
}

export interface ClassicCompassData {
  title: string;
  description: string;
  quadrants: Record<'tl' | 'tr' | 'bl' | 'br', {
    name: string;
    color: string;
    bg: string;
    nodes: ClassicNode[];
  }>;
}

export const CLASSIC_COMPASS: ClassicCompassData = {
  title: "Two-Axis Classification",
  description: "The original political compass.\nVertical axis is authority — how much power the state exercises.\nHorizontal axis is economics — public versus private control of the means of production.",
  quadrants: {
    tl: {
      name: "Authoritarian Left",
      color: "#B22234",
      bg: "#FBE9EC",
      nodes: [
        // Row 1 — most authoritarian (top-left corner = most extreme)
        { id: 'al0', label: "Stalinism", desc: "Totalitarian communism marked by cult of personality, central planning, and political purges." },
        { id: 'al1', label: "Maoism", desc: "Communist current for agrarian peasant societies; emphasizes continuous revolution and mass mobilization." },
        { id: 'al2', label: "Marxism-Leninism", desc: "20th-century communist orthodoxy combining Marxist theory with a vanguard-party state." },
        { id: 'al3', label: "Anti-Revisionism", desc: "Marxist tendency rejecting de-Stalinization and reformist drift away from \"true\" communism." },
        { id: 'al4', label: "Eco-Fascism", desc: "Authoritarian ecology demanding state-enforced population, migration, and resource controls." },
        // Row 2
        { id: 'al5', label: "Leninism", desc: "Vanguard-party theory of revolution; a disciplined cadre seizes state power on behalf of the workers." },
        { id: 'al6', label: "Trotskyism", desc: "Marxist current emphasizing permanent worldwide revolution against socialism in one country." },
        { id: 'al7', label: "Marxism", desc: "Theory of history as class struggle, capitalism as contradictory, and communism as its dialectical successor." },
        { id: 'al8', label: "Strasserism", desc: "Anti-capitalist faction of national socialism stressing socialist economics and worker solidarity." },
        { id: 'al9', label: "National Bolshevism", desc: "Synthesis of nationalism and Bolshevism, combining state socialism with ethnic identity." },
        // Row 3
        { id: 'al10', label: "Posadism", desc: "Trotskyist sect believing nuclear war and alien contact will accelerate world revolution." },
        { id: 'al11', label: "Stratocracy", desc: "Government by the military as a class, with citizenship tied to military service." },
        { id: 'al12', label: "Monarcho-Communism", desc: "Hybrid abolishing capitalism but retaining a hereditary head of state for cultural continuity." },
        { id: 'al13', label: "Futurism", desc: "Early-20th-century movement glorifying technology, speed, and revolutionary violence." },
        { id: 'al14', label: "Conservative Socialism", desc: "Socialism that defends traditional family, nation, and religion alongside collective economics." },
        // Row 4
        { id: 'al15', label: "State Capitalism", desc: "System where the state owns major industries but operates them on commercial, capitalist terms." },
        { id: 'al16', label: "Eco-Socialism", desc: "Synthesis of socialism and ecology; class struggle and ecological limits as joint constraints." },
        { id: 'al17', label: "Left-Wing Nationalism", desc: "Nationalism rooted in social justice and anti-imperialism rather than ethnic supremacy." },
        { id: 'al18', label: "Social Nationalism", desc: "Nationalism centered on the welfare and economic security of the nation's working class." },
        { id: 'al19', label: "Orthodox Marxism", desc: "Engels–Kautsky reading of Marx; historical materialism without Leninist additions." },
        // Row 5 — most moderate auth-left (bottom-right corner = closest to compass center)
        { id: 'al20', label: "Left Populism", desc: "Mass mobilization framing politics as \"the people\" against an entrenched economic elite." },
        { id: 'al21', label: "Agrarianism", desc: "Doctrine that rural life and small-farm property are the foundation of a healthy society." },
        { id: 'al22', label: "Labourism", desc: "Politics centered on the trade-union movement and parliamentary representation of labor." },
        { id: 'al23', label: "Distributism", desc: "Catholic alternative to capitalism and socialism; widely distribute small productive property." },
        { id: 'al24', label: "Christian Democracy", desc: "Center political tradition applying Catholic social teaching to law and economics." }
      ]
    },
    tr: {
      name: "Authoritarian Right",
      color: "#3C3B6E",
      bg: "#E8EFF9",
      nodes: [
        // Row 1 — most authoritarian (top-right corner = most extreme)
        { id: 'ar0', label: "Theocracy", desc: "Government in which religious authorities hold political power and divine law is state law." },
        { id: 'ar1', label: "Reactionarism", desc: "Opposition to modernity; aim to reverse social progress and restore prior hierarchical order." },
        { id: 'ar2', label: "Absolute Monarchism", desc: "All political power vested in a hereditary monarch with no constitutional constraints." },
        { id: 'ar3', label: "Imperialism", desc: "Policy of extending state power via territorial conquest, colonization, and political domination." },
        { id: 'ar4', label: "Nazism", desc: "Ultranationalist totalitarianism adding biological racism, anti-Semitism, and conquest-driven expansionism." },
        // Row 2
        { id: 'ar5', label: "Integralism", desc: "Political theology fusing church and state under a single religious moral order." },
        { id: 'ar6', label: "Aristocracy", desc: "Rule by a hereditary noble class believed to possess superior virtue or capability." },
        { id: 'ar7', label: "Colonialism", desc: "Direct rule and economic exploitation of foreign territories by a metropolitan power." },
        { id: 'ar8', label: "Authoritarian Capitalism", desc: "Free-market economy under a politically authoritarian, often one-party regime." },
        { id: 'ar9', label: "Neo-Nazism", desc: "Postwar movements reviving Nazi ideology, racial supremacism, and Holocaust denial." },
        // Row 3
        { id: 'ar10', label: "Feudalism", desc: "Hierarchical system of personal lord-vassal obligations tied to land tenure and military service." },
        { id: 'ar11', label: "Elective Monarchism", desc: "Monarchy where the ruler is selected by an electing body rather than inherited." },
        { id: 'ar12', label: "Corporate Autocracy", desc: "Society effectively governed by powerful corporations through capture of state functions." },
        { id: 'ar13', label: "Fascism", desc: "Authoritarian ultranationalism centered on a strong leader, militarism, and corporatist economy." },
        { id: 'ar14', label: "Neo-Fascism", desc: "Postwar movements that update fascist themes for modern democratic settings." },
        // Row 4
        { id: 'ar15', label: "Constitutional Monarchism", desc: "Hereditary monarch as head of state with powers limited by constitution and parliament." },
        { id: 'ar16', label: "Traditionalist Conservatism", desc: "Conservatism rooted in religion, hierarchy, and continuity with pre-modern social order." },
        { id: 'ar17', label: "Nationalist Conservatism", desc: "Conservatism that places national sovereignty and cultural cohesion above markets or globalism." },
        { id: 'ar18', label: "Paleo-Conservatism", desc: "Traditionalist conservatism emphasizing restrictionism and small federal government." },
        { id: 'ar19', label: "Kratocracy", desc: "Rule by the strong; legitimacy held to flow simply from the capacity to seize and hold power." },
        // Row 5 — most moderate auth-right (bottom-left corner = closest to compass center)
        { id: 'ar20', label: "Senatorialism", desc: "Government dominated by an aristocratic upper chamber rather than a popular assembly." },
        { id: 'ar21', label: "Liberal Conservatism", desc: "Conservatism that endorses classical-liberal economics while preserving traditional cultural values." },
        { id: 'ar22', label: "Conservatism", desc: "Defense of established institutions, traditions, and incremental rather than radical change." },
        { id: 'ar23', label: "Eco-Conservatism", desc: "Conservation of nature framed as stewardship of a sacred or inherited landscape." },
        { id: 'ar24', label: "Neo-Conservatism", desc: "Hawkish conservatism advocating assertive foreign policy and democracy promotion abroad." }
      ]
    },
    bl: {
      name: "Libertarian Left",
      color: "#3C3B6E",
      bg: "#E8EFF9",
      nodes: [
        // Row 1 — least libertarian (top-right corner = closest to compass center)
        { id: 'll0', label: "Democratic Socialism", desc: "Pursuit of socialism through democratic means and gradual reform of liberal institutions." },
        { id: 'll1', label: "Council Communism", desc: "Direct democracy through workers' councils, opposed to vanguard parties and bureaucracy." },
        { id: 'll2', label: "Welfarism", desc: "Politics whose central aim is a robust welfare state delivering social goods to all citizens." },
        { id: 'll3', label: "Progressivism", desc: "Reformist movement seeking incremental social, economic, and political improvement through public action." },
        { id: 'll4', label: "Social Democracy", desc: "Capitalist mixed economy paired with strong welfare state, labor rights, and redistribution." },
        // Row 2
        { id: 'll5', label: "Left Communism", desc: "Communist tendency to the left of Leninism; opposed to parliaments, unions, and party rule." },
        { id: 'll6', label: "Market Socialism", desc: "Workers own and manage firms while goods and services are exchanged in free markets." },
        { id: 'll7', label: "Liberal Socialism", desc: "Synthesis aiming to combine liberal civil rights with socialist ownership and equality." },
        { id: 'll8', label: "Social Liberalism", desc: "Liberalism that sees positive state action as needed to secure substantive freedom for all." },
        { id: 'll9', label: "Georgism", desc: "Single-tax economics: capture rents on land for public revenue, leave labor and capital free." },
        // Row 3
        { id: 'll10', label: "Libertarian Socialism", desc: "Anti-authoritarian socialism rejecting both the capitalist market and the centralized state." },
        { id: 'll11', label: "Mutualism", desc: "Market-based anarchism with worker cooperatives and credit unions replacing capitalist firms." },
        { id: 'll12', label: "Syndicalism", desc: "Politics built on industrial trade unions as the core institutions of a self-managed economy." },
        { id: 'll13', label: "Green Politics", desc: "Movement organized around ecology, grassroots democracy, social justice, and nonviolence." },
        { id: 'll14', label: "Environmentalism", desc: "Politics whose central commitment is protecting ecosystems, biodiversity, and the climate." },
        // Row 4
        { id: 'll15', label: "Anarcho-Syndicalism", desc: "Workers organize industry through revolutionary trade unions, eventually replacing the state." },
        { id: 'll16', label: "Anarcho-Collectivism", desc: "Anarchism with collective ownership of production and compensation by labor contributed." },
        { id: 'll17', label: "Anarcha-Feminism", desc: "Anarchism that treats patriarchy as inseparable from the state and capitalism." },
        { id: 'll18', label: "Queer Anarchism", desc: "Anarchist tendency centering LGBTQ liberation and dismantling heteronormative power." },
        { id: 'll19', label: "Left Accelerationism", desc: "Push capitalism's contradictions and technologies forward to break beyond it into post-capitalism." },
        // Row 5 — most libertarian (bottom-left corner = most extreme)
        { id: 'll20', label: "Anarcho-Communism", desc: "Stateless society organized around common ownership and free association of producers." },
        { id: 'll21', label: "Anarcho-Primitivism", desc: "Critique of civilization itself; calls for a return to pre-industrial or pre-agricultural life." },
        { id: 'll22', label: "Anarcho-Pacifism", desc: "Anarchism committed to nonviolence and refusal of war, conscription, and state coercion." },
        { id: 'll23', label: "Eco-Anarchism", desc: "Anti-state, anti-capitalist movement centered on ecological balance and bioregionalism." },
        { id: 'll24', label: "Ecofeminism", desc: "Movement linking the domination of women to the domination of nature; ends both together." }
      ]
    },
    br: {
      name: "Libertarian Right",
      color: "#B22234",
      bg: "#FBE9EC",
      nodes: [
        // Row 1 — least libertarian (top-left corner = closest to compass center)
        { id: 'lr0', label: "Classical Liberalism", desc: "Philosophy of individual rights, limited government, and free markets." },
        { id: 'lr1', label: "Democratic Liberalism", desc: "Procedural liberal democracy with civil liberties and a regulated market economy." },
        { id: 'lr2', label: "Neoclassical Liberalism", desc: "Modern liberal tradition centered on market efficiency and constitutional limits on government." },
        { id: 'lr3', label: "Liberal Corporatism", desc: "Negotiated bargains among labor, capital, and the state inside a market democracy." },
        { id: 'lr4', label: "Capitalism", desc: "Economic system based on private ownership of capital, wage labor, and market exchange." },
        // Row 2
        { id: 'lr5', label: "Neoliberalism", desc: "Policy program of deregulation, privatization, free trade, and reduced public spending." },
        { id: 'lr6', label: "Techno-Liberalism", desc: "Liberal politics centered on technology as the engine of progress and opportunity." },
        { id: 'lr7', label: "Conservative Libertarianism", desc: "Free-market politics paired with traditional cultural and moral commitments." },
        { id: 'lr8', label: "National Libertarianism", desc: "Libertarianism that prioritizes a sovereign nation-state over global integration." },
        { id: 'lr9', label: "Paleo-Libertarianism", desc: "Free markets fused with cultural traditionalism and decentralism." },
        // Row 3
        { id: 'lr10', label: "Eco-Capitalism", desc: "Use of markets, property rights, and pricing to deliver environmental outcomes." },
        { id: 'lr11', label: "Green Libertarianism", desc: "Environmentalism via property rights, tort law, and market-based ecological pricing." },
        { id: 'lr12', label: "Libertarianism", desc: "Maximal individual liberty and minimal state, paired with strong property rights." },
        { id: 'lr13', label: "Transhumanism", desc: "Movement to use science and technology to expand human capabilities beyond biological limits." },
        { id: 'lr14', label: "Objectivism", desc: "Philosophy of rational self-interest, laissez-faire capitalism, and ethical egoism." },
        // Row 4
        { id: 'lr15', label: "Consequentialism", desc: "Ethics judging actions by their outcomes; here applied as a defense of market liberty." },
        { id: 'lr16', label: "Minarchism", desc: "Libertarian state limited to police, courts, and defense — the \"night-watchman\" state." },
        { id: 'lr17', label: "Voluntaryism", desc: "Principle that all human relations should be uncoerced and based on consent." },
        { id: 'lr18', label: "Crypto-Anarchism", desc: "Stateless privacy and economy enabled by strong cryptography and uncensorable digital cash." },
        { id: 'lr19', label: "Individualist Anarchism", desc: "Anarchism rooted in individual sovereignty rather than collective ownership." },
        // Row 5 — most libertarian + most right (bottom-right corner = most extreme)
        { id: 'lr20', label: "Egoism", desc: "Philosophy in which the individual ego is the only legitimate basis for action and value." },
        { id: 'lr21', label: "Propertarianism", desc: "Holds private property as the foundational moral and legal institution from which other rights derive." },
        { id: 'lr22', label: "Agorism", desc: "Libertarian strategy of building counter-economic markets to bypass and erode the state." },
        { id: 'lr23', label: "Avaritionism", desc: "Libertarian extreme glorifying unrestrained acquisitiveness as a productive ordering principle." },
        { id: 'lr24', label: "Anarcho-Capitalism", desc: "Stateless society where all functions including law and defense are provided by markets." }
      ]
    }
  }
};
