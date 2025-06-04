
export default function Form() {
    return (
        <div className="flex flex-col p-8 items-center justify-start h-dvh text-left">
            <div className="flex flex-col items-center justify-start mb-8 gap-2">
                <h1 className="text-2xl font-semibold">O que você quer melhorar?🎯 </h1>
                <p className="text-muted-foreground">Escolha os que mais representam seu momento atual. Isso vai nos ajudar a te guiar melhor.</p>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 lg:grid-rows-2 sm:grid-rows-3 gap-8 w-full md:pl-44 md:pr-44">
                <div className="flex flex-col items-start justify-start p-3 border rounded-lg bg-yellow-100 hover:bg-gray-200 cursor-pointer">
                    <h2 className="text-sm font-semibold">Organizar minhas finanças</h2>
                </div>
            </div>
        </div>
    );
}
