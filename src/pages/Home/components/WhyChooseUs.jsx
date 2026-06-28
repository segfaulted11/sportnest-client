import {
  ShieldCheck,
  Clock3,
  MapPinned,
} from "lucide-react";

function WhyChooseUs() {

  const features = [

    {
      icon:<ShieldCheck size={45}/>,
      title:"Secure Booking",
      desc:"Safe booking experience with trusted facility owners."
    },

    {
      icon:<Clock3 size={45}/>,
      title:"Instant Reservation",
      desc:"Reserve your slot within seconds."
    },

    {
      icon:<MapPinned size={45}/>,
      title:"Top Locations",
      desc:"Find sports facilities near your location."
    }

  ];

  return (

    <section className="py-24 container mx-auto px-4">

      <h2 className="text-4xl font-bold text-center mb-14">

        Why Choose SportNest?

      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {

          features.map((item,index)=>(

            <div
              key={index}
              className="card bg-base-100 shadow-xl p-8 text-center"
            >

              <div className="text-primary flex justify-center mb-5">

                {item.icon}

              </div>

              <h3 className="font-bold text-2xl mb-3">

                {item.title}

              </h3>

              <p>

                {item.desc}

              </p>

            </div>

          ))

        }

      </div>

    </section>

  );

}

export default WhyChooseUs;