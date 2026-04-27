/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Users, Cpu, Zap, Compass as CompassIcon, BookOpen, ArrowRight } from 'lucide-react';

interface CompassData {
  title: string;
  description: string;
  xAxis: { low: string; high: string };
  yAxis: { low: string; high: string };
  quadrants: {
    [key: string]: {
      name: string;
      color: string;
      bg: string;
      nodes: { id: string; label: string; sublabel?: string; desc: string; x: number; y: number }[];
    }
  };
}

const PLATFORM_LOGIC: CompassData = {
  title: "Platform Logic",
  description: "The structural architecture of systems. Governance through the lens of power distribution and value flow.",
  xAxis: { low: "Extractive", high: "Generative" },
  yAxis: { low: "Distributed", high: "Centralized" },
  quadrants: {
    tl: {
      name: "Centralized + Extractive",
      color: "#B22234",
      bg: "#FBE9EC",
      nodes: [
        { id: 'n0', label: "Surveillance", sublabel: "Capitalism State", x: 130, y: 124, desc: "Corporate-state fusion using data extraction as the primary revenue model. Attention harvested, behavior modified, political will shaped." },
        { id: 'n1', label: "Fiat Welfare", sublabel: "Bureaucracy", x: 266, y: 124, desc: "Current mainstream Western governance. Redistributive, high-latency, high-overhead, capture-prone, paper-infrastructure legacy." },
        { id: 'n2', label: "Industrial", sublabel: "Authoritarianism", x: 130, y: 268, desc: "Centralized production systems with enforced labor discipline. Necessary for certain scales of physical coordination." },
        { id: 'n3', label: "Nationalist", sublabel: "Extractivism", x: 266, y: 268, desc: "Central authority captures resource rents and distributes them to political constituents. Stable until the resource runs out." }
      ]
    },
    tr: {
      name: "Centralized + Generative",
      color: "#3C3B6E",
      bg: "#E8EFF9",
      nodes: [
        { id: 'n4', label: "Developmental", sublabel: "State Capitalism", x: 410, y: 124, desc: "Central coordination of investment toward generative industries. The state picks directions but genuinely tries to grow the pie." },
        { id: 'n5', label: "Technocratic", sublabel: "Welfarism", x: 546, y: 124, desc: "Centralized social support modernized with tech infrastructure. Low-latency delivery, algorithmic matching, reduced overhead." },
        { id: 'n6', label: "Aligned AI", sublabel: "Governance", x: 410, y: 268, desc: "Constitutional AI systems as the authority layer. Rules encoded in models that are transparent, auditable, and consistent." },
        { id: 'n7', label: "Guided Innovation", sublabel: "Economy", x: 546, y: 268, desc: "Central research investment with distributed commercialization (DARPA model). Government funds basics, private networks build on top." }
      ]
    },
    bl: {
      name: "Distributed + Extractive",
      color: "#3C3B6E",
      bg: "#E8EFF9",
      nodes: [
        { id: 'n8', label: "Platform", sublabel: "Feudalism", x: 130, y: 404, desc: "Distributed architecture controlled by extractive platform owners. Value flows to shareholders, not contributors. (e.g., current Gig Economy models)." },
        { id: 'n9', label: "Crypto", sublabel: "Oligarchy", x: 266, y: 404, desc: "Nominally decentralized ledgers where early adopters hold disproportionate governance power. Decentralized architecture, extractive practice." },
        { id: 'n10', label: "Network", sublabel: "Nationalism", x: 130, y: 548, desc: "Distributed within borders, extractive at borders. National digital currencies and data localization to extract from outsiders." },
        { id: 'n11', label: "Algorithmic", sublabel: "Feudalism", x: 266, y: 548, desc: "AI systems that appear to mediate fairly but optimize for owner profit. recommendation algorithms that extract attention while appearing neutral." }
      ]
    },
    br: {
      name: "Distributed + Generative",
      color: "#B22234",
      bg: "#FBE9EC",
      nodes: [
        { id: 'n12', label: "Contribution", sublabel: "Network Democracy", x: 410, y: 404, desc: "Governance through verified contribution records. Voting weight proportional to demonstrated positive-sum participation." },
        { id: 'n13', label: "Open Source", sublabel: "Technocracy", x: 546, y: 404, desc: "Elected technical stewards validate changes to shared infrastructure. Pull-request governance with community review." },
        { id: 'n14', label: "Crypto", sublabel: "Mutualism", x: 410, y: 548, desc: "Peer-to-peer contribution tracking on public ledgers. Helping events are positive transactions that generate reputation." },
        { id: 'n15', label: "Transhumanist", sublabel: "Contributionism", x: 546, y: 548, desc: "Technology expands who can contribute and how. Cognitive augmentation and AI tools mean capacity is not fixed by birth." }
      ]
    }
  }
};

const USER_LOGIC: CompassData = {
  title: "User Logic",
  description: "The cognitive and individual dimension. Governance through the lens of human augmentation and sovereignty.",
  xAxis: { low: "Sovereign", high: "Networked" },
  yAxis: { low: "Organic", high: "Augmented" },
  quadrants: {
    tl: {
      name: "Augmented + Sovereign",
      color: "#B22234",
      bg: "#FBE9EC",
      nodes: [
        { id: 'a0', label: "Enhanced", sublabel: "Individualism", x: 130, y: 124, desc: "Fully augmented humans who use technology to amplify personal capability while maintaining strict cognitive sovereignty." },
        { id: 'a1', label: "Cognitive", sublabel: "Libertarianism", x: 266, y: 124, desc: "Political philosophy of augmented sovereignty. Your mind—biological and technological—is your absolute property." },
        { id: 'a2', label: "Augmented", sublabel: "Meritocracy", x: 130, y: 268, desc: "A society where status and contribution are determined by demonstrated augmented capability. Neural augmentation creates genuine hierarchy." },
        { id: 'a3', label: "Solo", sublabel: "Superintelligence", x: 266, y: 268, desc: "Extreme augmented-sovereign position. Individual cognitive capability vastly exceeds baseline but remains personal." }
      ]
    },
    tr: {
      name: "Augmented + Networked",
      color: "#3C3B6E",
      bg: "#E8EFF9",
      nodes: [
        { id: 'b0', label: "Neural", sublabel: "Democracy", x: 410, y: 124, desc: "Governance through networked consensus. Citizens with high-bandwidth interfaces participate in collective decision-making at network speed." },
        { id: 'b1', label: "Hive", sublabel: "Synthesis", x: 546, y: 124, desc: "Voluntary partial merger of individual identity into collective cognition. Participants maintain threads of experience while sharing processing." },
        { id: 'b2', label: "Mesh", sublabel: "Governance", x: 410, y: 268, desc: "Distributed governance through neural mesh infrastructure. AI mediates between individual nodes and collective outcomes." },
        { id: 'b3', label: "Collective", sublabel: "Superintelligence", x: 546, y: 268, desc: "Sufficiently large and connected neural mesh achieves cognitive capability that no individual could reach alone." }
      ]
    },
    bl: {
      name: "Organic + Sovereign",
      color: "#3C3B6E",
      bg: "#E8EFF9",
      nodes: [
        { id: 'c0', label: "Biological", sublabel: "Libertarianism", x: 130, y: 404, desc: "Philosophy of organic sovereignty. The unaugmented human body and mind are the irreducible unit of political rights." },
        { id: 'c1', label: "Neo-", sublabel: "Primitivism", x: 266, y: 404, desc: "Conscious refusal of augmentation. Not ignorance of technology—conscious choice of biological rhythms and human-scale relationships." },
        { id: 'c2', label: "Unaugmented", sublabel: "Individualism", x: 130, y: 548, desc: "Full personal sovereignty, biological baseline, individual competition without technological amplification." },
        { id: 'c3', label: "Natural", sublabel: "Baseline", x: 266, y: 548, desc: "The unaugmented floor. Cognitively and socially outside the primary civilization layer but protected by right." }
      ]
    },
    br: {
      name: "Organic + Networked",
      color: "#B22234",
      bg: "#FBE9EC",
      nodes: [
        { id: 'd0', label: "Cultural", sublabel: "Collectivism", x: 410, y: 404, desc: "Communities organized around shared cultural identity and mutual obligation rather than neural networking." },
        { id: 'd1', label: "Traditional", sublabel: "Commons", x: 546, y: 404, desc: "Resource sharing and collective governance organized through pre-technological structures (councils, elders)." },
        { id: 'd2', label: "Community", sublabel: "Organicism", x: 410, y: 548, desc: "Organic communities that selectively engage with the augmented civilization layer on their own terms." },
        { id: 'd3', label: "Tribal", sublabel: "Sovereignty", x: 546, y: 548, desc: "Insular communities that maintain their own governance and engage with the wider civilization on treaty terms." }
      ]
    }
  }
};

interface ClassicNode {
  id: string;
  label: string;
  desc: string;
}

interface ClassicCompassData {
  title: string;
  description: string;
  quadrants: Record<'tl' | 'tr' | 'bl' | 'br', {
    name: string;
    color: string;
    bg: string;
    nodes: ClassicNode[];
  }>;
}

const CLASSIC_COMPASS: ClassicCompassData = {
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

const ClassicCompass = ({ activeNode, setActiveNode }: {
  activeNode: any;
  setActiveNode: (n: any) => void;
}) => {
  const renderQuadrant = (
    nodes: ClassicNode[],
    bg: string,
    accent: string
  ) => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 md:grid-rows-5 md:auto-rows-fr gap-1 p-1.5" style={{ backgroundColor: bg }}>
      {nodes.map(node => {
        const active = activeNode?.id === node.id;
        return (
          <button
            key={node.id}
            onClick={(e) => setActiveNode({ ...node, clientX: e.clientX, clientY: e.clientY })}
            style={active ? { borderColor: accent, color: accent } : undefined}
            className={`bg-white/85 hover:bg-white border-2 border-slate-200 hover:border-slate-400 rounded text-[10px] md:text-[10.5px] font-semibold leading-tight text-slate-800 px-1.5 py-1 min-h-[52px] flex items-center justify-center text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 ${active ? 'bg-white shadow-sm' : ''}`}
          >
            {node.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-8 overflow-hidden">
      <div className="flex flex-col mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-2">
          <CompassIcon className="w-6 h-6 text-[#3C3B6E]" />
          {CLASSIC_COMPASS.title}
        </h2>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
          {CLASSIC_COMPASS.description}
        </p>
      </div>

      <div className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] gap-x-3 md:gap-x-4 gap-y-2 md:gap-y-3 items-stretch">
        {/* Top label */}
        <div className="col-start-2 flex flex-col items-center text-slate-700">
          <span className="text-slate-400 text-xs leading-none mb-0.5">▲</span>
          <span className="text-sm md:text-base font-semibold tracking-wider uppercase">Authoritarian</span>
        </div>

        {/* Left label */}
        <div className="row-start-2 col-start-1 flex items-center text-slate-700 pr-1">
          <span className="text-slate-400 text-xs mr-1">◀</span>
          <span className="text-sm md:text-base font-semibold tracking-wider uppercase">Left</span>
        </div>

        {/* Center: 2x2 quadrants */}
        <div className="row-start-2 col-start-2 grid grid-cols-2 grid-rows-2 border-2 border-slate-400 rounded-sm overflow-hidden md:aspect-[4/3]">
          {renderQuadrant(CLASSIC_COMPASS.quadrants.tl.nodes, CLASSIC_COMPASS.quadrants.tl.bg, CLASSIC_COMPASS.quadrants.tl.color)}
          {renderQuadrant(CLASSIC_COMPASS.quadrants.tr.nodes, CLASSIC_COMPASS.quadrants.tr.bg, CLASSIC_COMPASS.quadrants.tr.color)}
          {renderQuadrant(CLASSIC_COMPASS.quadrants.bl.nodes, CLASSIC_COMPASS.quadrants.bl.bg, CLASSIC_COMPASS.quadrants.bl.color)}
          {renderQuadrant(CLASSIC_COMPASS.quadrants.br.nodes, CLASSIC_COMPASS.quadrants.br.bg, CLASSIC_COMPASS.quadrants.br.color)}
        </div>

        {/* Right label */}
        <div className="row-start-2 col-start-3 flex items-center text-slate-700 pl-1">
          <span className="text-sm md:text-base font-semibold tracking-wider uppercase">Right</span>
          <span className="text-slate-400 text-xs ml-1">▶</span>
        </div>

        {/* Bottom label */}
        <div className="row-start-3 col-start-2 flex flex-col items-center text-slate-700">
          <span className="text-sm md:text-base font-semibold tracking-wider uppercase">Libertarian</span>
          <span className="text-slate-400 text-xs leading-none mt-0.5">▼</span>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-slate-400 italic">
        Click any cell for its definition · 100 abstract ideologies across 4 quadrants
      </div>
    </div>
  );
};

const Compass = ({ data, activeNode, setActiveNode }: {
  data: CompassData; 
  activeNode: any; 
  setActiveNode: (n: any) => void 
}) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-8 overflow-hidden group">
      <div className="flex flex-col mb-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
          {data.title === "Platform Logic" ? <Cpu className="w-5 h-5 text-[#3C3B6E]" /> : <Users className="w-5 h-5 text-[#B22234]" />}
          {data.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
          {data.description}
        </p>
      </div>

      <div className="relative w-full max-w-[760px] mx-auto select-none" style={{ aspectRatio: '800 / 720' }}>
        <svg viewBox="0 0 800 720" className="w-full h-full">
          {/* Background Quadrants */}
          <rect x="120" y="80" width="280" height="280" fill={data.quadrants.tl.bg} className="transition-colors duration-500" />
          <rect x="400" y="80" width="280" height="280" fill={data.quadrants.tr.bg} className="transition-colors duration-500" />
          <rect x="120" y="360" width="280" height="280" fill={data.quadrants.bl.bg} className="transition-colors duration-500" />
          <rect x="400" y="360" width="280" height="280" fill={data.quadrants.br.bg} className="transition-colors duration-500" />

          {/* Grid Lines */}
          <rect x="120" y="80" width="560" height="560" fill="none" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="120" y1="360" x2="680" y2="360" stroke="#94a3b8" strokeWidth="1" strokeDasharray="5 3" />
          <line x1="400" y1="80" x2="400" y2="640" stroke="#94a3b8" strokeWidth="1" strokeDasharray="5 3" />

          {/* Axes Decorations */}
          <g className="text-slate-400">
            <line x1="400" y1="80" x2="400" y2="50" stroke="currentColor" strokeWidth="2" />
            <polygon points="400,44 395,56 405,56" fill="currentColor" />

            <line x1="400" y1="640" x2="400" y2="670" stroke="currentColor" strokeWidth="2" />
            <polygon points="400,676 395,664 405,664" fill="currentColor" />

            <line x1="120" y1="360" x2="90" y2="360" stroke="currentColor" strokeWidth="2" />
            <polygon points="84,360 96,355 96,365" fill="currentColor" />

            <line x1="680" y1="360" x2="710" y2="360" stroke="currentColor" strokeWidth="2" />
            <polygon points="716,360 704,355 704,365" fill="currentColor" />
          </g>

          {/* Labels */}
          <text textAnchor="middle" x="400" y="36" className="text-[14px] font-medium fill-slate-700">{data.yAxis.high}</text>
          <text textAnchor="middle" x="400" y="700" className="text-[14px] font-medium fill-slate-700">{data.yAxis.low}</text>
          <text textAnchor="end" x="78" y="365" className="text-[14px] font-medium fill-slate-700">{data.xAxis.low}</text>
          <text textAnchor="start" x="722" y="365" className="text-[14px] font-medium fill-slate-700">{data.xAxis.high}</text>

          {/* Quadrant Titles */}
          <text x="128" y="100" className="text-[10px] uppercase tracking-wider font-bold opacity-40" fill={data.quadrants.tl.color}>{data.quadrants.tl.name}</text>
          <text x="408" y="100" className="text-[10px] uppercase tracking-wider font-bold opacity-40" fill={data.quadrants.tr.color}>{data.quadrants.tr.name}</text>
          <text x="128" y="380" className="text-[10px] uppercase tracking-wider font-bold opacity-40" fill={data.quadrants.bl.color}>{data.quadrants.bl.name}</text>
          <text x="408" y="380" className="text-[10px] uppercase tracking-wider font-bold opacity-40" fill={data.quadrants.br.color}>{data.quadrants.br.name}</text>

          {/* Interactive Nodes */}
          {Object.values(data.quadrants).flatMap(q => q.nodes).map(node => (
            <g key={node.id}
               className="cursor-pointer group/node"
               onClick={(e) => {
                 setActiveNode({ ...node, clientX: e.clientX, clientY: e.clientY });
               }}
            >
              <rect
                x={node.x} y={node.y} width="124" height="48" rx="8"
                className={`transition-all duration-300 ${activeNode?.id === node.id ? 'stroke-[#B22234] stroke-2 fill-white' : 'fill-white/60 stroke-slate-200 group-hover/node:stroke-slate-400 group-hover/node:fill-white/90'}`}
              />
              <text x={node.x + 62} y={node.y + 20} textAnchor="middle" className="text-[10.5px] font-semibold fill-slate-800 pointer-events-none">{node.label}</text>
              {node.sublabel && <text x={node.x + 62} y={node.y + 35} textAnchor="middle" className="text-[10.5px] font-semibold fill-slate-800 pointer-events-none">{node.sublabel}</text>}
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 text-center text-xs text-slate-400 italic">
        Hover and click cells to explore political frameworks
      </div>
    </div>
  );
};

// TODO: replace with your real Amazon Associates tag (Amazon will reject unattributed links)
const AMAZON_AFFILIATE_TAG = 'polcompass-20';

const READING_LIST: { title: string; author: string; quadrant: string; blurb: string; search: string }[] = [
  { title: "The Communist Manifesto", author: "Marx & Engels", quadrant: "Auth-Left", blurb: "Founding text of class-struggle politics. History reframed as the conflict of economic classes." },
  { title: "The State and Revolution", author: "V.I. Lenin", quadrant: "Auth-Left", blurb: "The Bolshevik blueprint for a vanguard-led seizure of state power on behalf of the workers." },
  { title: "Reflections on the Revolution in France", author: "Edmund Burke", quadrant: "Auth-Right", blurb: "The intellectual foundation of modern conservatism. Tradition, prudence, and continuity over abstraction." },
  { title: "Leviathan", author: "Thomas Hobbes", quadrant: "Auth-Right", blurb: "The social-contract case for an absolute sovereign as the only escape from the state of nature." },
  { title: "The Conquest of Bread", author: "Peter Kropotkin", quadrant: "Lib-Left", blurb: "Classical anarcho-communism: a stateless society of voluntary cooperation and free distribution." },
  { title: "The Dispossessed", author: "Ursula K. Le Guin", quadrant: "Lib-Left", blurb: "Anarchist utopia in fiction — what a libertarian-socialist world might actually feel like to live in." },
  { title: "The Wealth of Nations", author: "Adam Smith", quadrant: "Lib-Right", blurb: "The classical case for markets, division of labor, and the invisible hand of self-interested exchange." },
  { title: "Anarchy, State, and Utopia", author: "Robert Nozick", quadrant: "Lib-Right", blurb: "The libertarian counterargument to Rawls; the moral case for a minimal night-watchman state." },
].map(b => ({ ...b, search: `${b.title} ${b.author}` }));

const amazonURL = (search: string) =>
  `https://www.amazon.com/s?${new URLSearchParams({ k: search, tag: AMAZON_AFFILIATE_TAG }).toString()}`;

const ReadingList = () => (
  <section className="border-t border-slate-200 pt-16 pb-4">
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 flex items-center justify-center gap-2">
        <BookOpen className="w-6 h-6 text-[#3C3B6E]" />
        Foundational Reading
      </h2>
      <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
        Two canonical texts for each corner of the compass. Read the original arguments rather than the caricatures.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
      {READING_LIST.map(book => {
        const accent = book.quadrant.endsWith('Left') === (book.quadrant.startsWith('Auth')) ? '#B22234' : '#3C3B6E';
        return (
          <a
            key={book.title}
            href={amazonURL(book.search)}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="group flex flex-col bg-white border border-slate-200 hover:border-slate-400 rounded-xl p-5 transition-all hover:shadow-md"
          >
            <span className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: accent }}>
              {book.quadrant}
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-1 leading-tight">{book.title}</h3>
            <p className="text-xs text-slate-500 mb-3">{book.author}</p>
            <p className="text-sm text-slate-700 leading-relaxed mb-4 flex-1">{book.blurb}</p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#3C3B6E] group-hover:text-[#B22234] transition-colors">
              View on Amazon <ArrowRight className="w-3 h-3" />
            </span>
          </a>
        );
      })}
    </div>

    <p className="text-xs text-slate-400 text-center mt-8 max-w-2xl mx-auto italic">
      As an Amazon Associate, we earn from qualifying purchases. Links above use our affiliate ID.
    </p>
  </section>
);

export default function App() {
  const [activeNode, setActiveNode] = useState<any>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activeNode && !tooltipRef.current?.contains(e.target as Node)) {
        setActiveNode(null);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [activeNode]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#B22234]/15 selection:text-[#3C3B6E]">
      {/* Flag stripe */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#B22234]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#3C3B6E]" />
      </div>

      <div className="max-w-[1500px] mx-auto px-6 py-12 md:py-20">
        {/* Hero Section */}
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#3C3B6E] text-white rounded-full text-xs font-semibold tracking-wide uppercase mb-6"
          >
            <Zap className="w-3 h-3" />
            The New Political Landscape
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-[#B22234]"
          >
            The Political Compass
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Traditional left-right politics is not dissolving — the distinction has never been more clear.
            <br />
            New axes of structural systems and cognitive expansion now sit alongside it.
            <br />
            Explore how <strong>Platform</strong> and <strong>User</strong> logic extend our possible futures.
          </motion.p>
        </header>

        {/* Classic Compass — front & center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <ClassicCompass activeNode={activeNode} setActiveNode={setActiveNode} />
        </motion.div>

        {/* Specialized Compasses */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Beyond the Classic Axes</h2>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
            Two additional dimensions that traditional left-right politics misses: the structural architecture of platforms, and the cognitive boundary of the user.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Compass data={PLATFORM_LOGIC} activeNode={activeNode} setActiveNode={setActiveNode} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Compass data={USER_LOGIC} activeNode={activeNode} setActiveNode={setActiveNode} />
          </motion.div>
        </div>

        {/* Foundational reading — Amazon affiliate */}
        <ReadingList />

        {/* Footer */}
        <footer className="text-center py-12 border-t border-slate-200">
          <div className="flex justify-center gap-1 mb-4">
            <span className="block w-8 h-1 bg-[#B22234]" />
            <span className="block w-8 h-1 bg-white border border-slate-200" />
            <span className="block w-8 h-1 bg-[#3C3B6E]" />
          </div>
          <p className="text-slate-400 text-sm">
            The Political Compass &copy; 2026. Built with React & Framer Motion.
          </p>
        </footer>
      </div>

      {/* Tooltip Popup */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            style={{
              left: Math.min(activeNode.clientX + 16, window.innerWidth - 320),
              top: Math.min(activeNode.clientY + 16, window.innerHeight - 200),
            }}
            className="fixed z-50 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-5 pointer-events-auto"
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-bold text-slate-900 leading-tight">
                {activeNode.label} {activeNode.sublabel}
              </h4>
              <button 
                onClick={() => setActiveNode(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                &times;
              </button>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed italic mb-4">
              {activeNode.desc}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest bg-[#3C3B6E] px-2 py-1 rounded w-fit">
              <Info className="w-3 h-3" />
              Logic Node
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
