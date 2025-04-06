import { Check } from "lucide-react";

const steps = [
  { label: "Dados de Cadastro" },
  { label: "Confirmação" },
  { label: "Finalização" },
];

export default function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between w-full p-4 mt-4 bg-white">
      <div className="relative flex justify-between items-center w-full max-w-lg">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} className="relative flex flex-col items-center gap-2 w-full">
              {/* Linha de conexão entre os steps */}
              {index > 0 && (
                <div
                  className={`absolute top-4 left-[-50%] h-1 w-full transition-all duration-300
                    ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
                />
              )}

              {/* Ícone do step */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full z-10
                  ${isCompleted ? "bg-green-500" : isActive ? "bg-blue-500" : "bg-gray-300"}`}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <span className="text-white font-bold">{index + 1}</span>
                )}
              </div>

              {/* Texto do step */}
              <p className="text-sm text-center text-muted-foreground">{step.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}