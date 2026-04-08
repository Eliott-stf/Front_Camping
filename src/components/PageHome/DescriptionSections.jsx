import React from "react";
import { Titre } from "../Ui/Titre";
import { Img } from "../Ui/Img";
import { Paragraphe } from "../Ui/Paragraphe";

export default function DescriptionSection({ imageUrl, title, description, badge, reversed = false, id }) {

    const space = <div className="hidden lg:block w-16 xl:w-24 shrink-0" />;

    const textBlock = (
        <div className="flex-1 min-w-0 flex flex-col justify-center">
            {badge && (
                <span className="inline-block bg-plum-200 text-plum-900 text-xs font-medium px-3 py-1 rounded-full w-fit mb-4">
                    {badge}
                </span>
            )}
            <Titre content={title} />
            <Paragraphe content={description} />
        </div>
    );

    return (
        <section id={id}>
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
                {reversed ? (
                    <>
                        {textBlock}
                        {space}
                        <Img url={imageUrl} />
                    </>
                ) : (
                    <>
                        <Img url={imageUrl} />
                        {space}
                        {textBlock}
                    </>
                )}
            </div>
        </section>
    );
}