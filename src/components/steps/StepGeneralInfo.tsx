import type {
  FormData,
  HousingType,
  ConstructionPeriod,
  ClimateZone,
} from "@/lib/types";
import { HelpCircle } from "lucide-react";

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

const HelperText = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2 rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
    <HelpCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
    <span>{children}</span>
  </div>
);

const OptionRow = ({
  selected,
  label,
  desc,
  onClick,
}: {
  selected: boolean;
  label: string;
  desc?: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full border px-4 py-3 text-left transition ${
      selected
        ? "border-primary bg-primary/5"
        : "border-border hover:border-primary/40"
    }`}
  >
    <div className="flex items-start gap-3">
      <div
        className={`mt-1 h-3 w-3 rounded-full border ${
          selected ? "bg-primary border-primary" : "border-muted-foreground"
        }`}
      />
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        {desc && <div className="text-xs text-muted-foreground">{desc}</div>}
      </div>
    </div>
  </button>
);

const StepGeneralInfo = ({ data, onChange }: Props) => {
  const constructionPeriods: ConstructionPeriod[] = [
    "before1948",
    "1948-1974",
    "1975-1988",
    "1989-2000",
    "2001-2012",
    "after2012",
  ];

  return (
    <div className="space-y-8">
      {/* Housing type */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Type de logement</h3>
        <HelperText>
          Une maison a plus de surfaces en contact avec l’extérieur qu’un appartement,
          ce qui augmente les pertes thermiques.
        </HelperText>

        <OptionRow
          selected={data.housingType === "apartment"}
          label="Appartement"
          onClick={() => onChange({ housingType: "apartment" })}
        />
        <OptionRow
          selected={data.housingType === "house"}
          label="Maison"
          onClick={() => onChange({ housingType: "house" })}
        />
      </div>

      {/* Surface */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">
          Surface habitable (m²)
        </h3>
        <HelperText>
          La surface permet de rapporter la consommation au mètre carré, base du DPE.
        </HelperText>

        <input
          type="number"
          value={data.surfaceArea}
          onChange={(e) =>
            onChange({ surfaceArea: Number(e.target.value) || 0 })
          }
          min={10}
          max={500}
          className="w-40 rounded border px-4 py-2 text-lg font-semibold text-foreground focus:border-primary focus:outline-none"
        />
      </div>

      {/* Construction period */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">
          Période de construction
        </h3>
        <HelperText>
          Les réglementations thermiques ont évolué. Avant 1974, il n’y avait
          généralement aucune isolation.
        </HelperText>

        {constructionPeriods.map((p) => (
          <OptionRow
            key={p}
            selected={data.constructionPeriod === p}
            label={p.replace("-", " – ")}
            onClick={() => onChange({ constructionPeriod: p })}
          />
        ))}
        <OptionRow
          selected={!data.constructionPeriod}
          label="Je ne sais pas"
          desc="Nous utiliserons une estimation moyenne"
          onClick={() => onChange({ constructionPeriod: undefined })}
        />
      </div>

      {/* Climate zone */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">
          Zone climatique
        </h3>
        <HelperText>
          Le climat influence directement les besoins de chauffage.
        </HelperText>

        <OptionRow
          selected={data.climateZone === "H1"}
          label="H1 — Nord & Est"
          desc="Hivers froids"
          onClick={() => onChange({ climateZone: "H1" })}
        />
        <OptionRow
          selected={data.climateZone === "H2"}
          label="H2 — Ouest & Centre"
          desc="Tempéré"
          onClick={() => onChange({ climateZone: "H2" })}
        />
        <OptionRow
          selected={data.climateZone === "H3"}
          label="H3 — Sud"
          desc="Hivers doux"
          onClick={() => onChange({ climateZone: "H3" })}
        />
        <OptionRow
          selected={!data.climateZone}
          label="Je ne sais pas"
          desc="Nous utiliserons une estimation moyenne"
          onClick={() => onChange({ climateZone: undefined })}
        />
      </div>
    </div>
  );
};

export default StepGeneralInfo;

