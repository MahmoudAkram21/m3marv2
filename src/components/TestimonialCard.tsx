import Image from "next/image";

function TestimonialCard({
  data,
}: {
  data: {
    id: number;
    name: string;
    jobTitle: string;
    sales: number;
    aria: number;
    img: string;
    phone: string;
    secondPhone: string;
  };
}) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="flex flex-row relative w-16 h-16 mb-2">
          <Image
            className="mt-2 mr-5 rounded-full shadow-lg object-cover"
            src={data.img}
            alt={data.name}
            fill
          />
          <div className="flex flex-col mt-3">
            <p className="font-bold text-l">{data.name}</p>
            <p className="text-sm text-gray-500">{data.jobTitle}</p>
          </div>
        </div>
        <p className="text-gray-700 text-base mt-2">{data.name}</p>
      </div>
    </div>
  );
}

export default TestimonialCard;
