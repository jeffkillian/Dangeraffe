function CanvasDebugDraw(ctx)
{
    this.parent.call(this);
    this.context = ctx;
    this.scale = 1;
}

CanvasDebugDraw.prototype =
{
    //
    DrawPolygon: function(vertices, vertexCount, color)
    {
        this.context.strokeStyle = this.ColorFor(color, 1.0);
        this.context.beginPath();
        this.context.moveTo(vertices[0].x*this.scale, vertices[0].y*this.scale);

        for (var i = 1; i < vertexCount; ++i)
            this.context.lineTo(vertices[i].x*this.scale, vertices[i].y*this.scale);

        this.context.closePath();
        this.context.stroke();
    },

    DrawSolidPolygon: function(vertices, vertexCount, color)
    {
        this.context.fillStyle = this.ColorFor(new b2Color(color.r * 0.5, color.g * 0.5, color.b * 0.5) , 0.5);
        this.context.strokeStyle = this.ColorFor(color, 1.0);
        this.context.beginPath();
        this.context.moveTo(vertices[0].x*this.scale, vertices[0].y*this.scale);

        for (var i = 1; i < vertexCount; ++i)
            this.context.lineTo(vertices[i].x*this.scale, vertices[i].y*this.scale);

        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    },

    DrawCircle: function(center, radius, color)
    {
        this.context.strokeStyle = this.ColorFor(color, 1.0);
        this.context.beginPath();
        this.context.arc(center.x*this.scale, center.y*this.scale, radius, 0*this.scale, Math.PI * 2);
        this.context.closePath();
        this.context.stroke();
    },

    DrawSolidCircle: function(center, radius, axis, color)
    {
        this.context.fillStyle = this.ColorFor(new b2Color(color.r * 0.5, color.g * 0.5, color.b * 0.5), 0.5);
        this.context.strokeStyle = this.ColorFor(color, 1.0);
        this.context.beginPath();
        this.context.arc(center.x*this.scale, center.y*this.scale, radius*this.scale, 0, Math.PI * 2);
        if (axis)
        {
            this.context.moveTo(center.x*this.scale, center.y*this.scale);
            var p = b2Vec2.Add(center, b2Vec2.Multiply(radius*this.scale, axis));//TODO JJK Might have to multiply this by scale as well
            this.context.lineTo(p.x*this.scale, p.y*this.scale);
        }
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    },

    DrawSegment: function(p1, p2, color)
    {
        this.context.strokeStyle = this.ColorFor(color, 1.0);
        this.context.beginPath();
        this.context.moveTo(p1.x*this.scale, p1.y*this.scale);
        this.context.lineTo(p2.x*this.scale, p2.y*this.scale);
        this.context.closePath();
        this.context.stroke();
    },

    DrawTransform: function(xf)
    {
        var k_axisScale = 0.4;
        var p1 = xf.p, p2;

        this.context.strokeStyle = this.ColorFor(new b2Color(1, 0, 0), 1.0);
        this.context.beginPath();
        this.context.moveTo(p1.x*this.scale, p1.y*this.scale);
        p2 = b2Vec2.Add(p1, b2Vec2.Multiply(k_axisScale, xf.q.GetXAxis()));
        this.context.lineTo(p2.x*this.scale, p2.y*this.scale);
        this.context.closePath();
        this.context.stroke();

        this.context.strokeStyle = this.ColorFor(new b2Color(0, 1, 0), 1.0);
        this.context.beginPath();
        this.context.moveTo(p1.x*this.scale, p1.y*this.scale);
        p2 = b2Vec2.Add(p1, b2Vec2.Multiply(k_axisScale, xf.q.GetYAxis()));
        this.context.lineTo(p2.x*this.scale, p2.y*this.scale);
        this.context.closePath();
        this.context.stroke();
    },

    DrawPoint: function(p, size, color)
    {
        size = size / this.scale;
        var hs = size / 2;
        this.context.fillStyle = this.ColorFor(color, 1.0);
        this.context.fillRect(p.x - hs, p.y - hs, size, size);
    },

    DrawAABB: function(aabb, c)
    {
        this.context.fillStyle = this.ColorFor(c, 1.0);
        this.context.rect(aabb.lowerBound.x*this.scale, aabb.lowerBound.y*this.scale, aabb.upperBound.x*this.scale - aabb.lowerBound.x*this.scale, aabb.upperBound.y*this.scale - aabb.lowerBound.y*this.scale);
        this.context.stroke();
    },

    ColorFor: function(c, a)
    {
        var r = Math.floor(c.r * 255);
        var g = Math.floor(c.g * 255);
        var b = Math.floor(c.b * 255);

        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    },

    DrawParticles: function(centers, radius, colors, count)
    {
        this.context.fillStyle = 'rgba(255, 255, 255, 0.25)';
        for (var i = 0; i < count; ++i)
        {
            if (colors && colors[i])
                this.context.fillStyle = 'rgba(' + colors[i].r + ', ' + colors[i].g + ', ' + colors[i].b + ', ' + (colors[i].a / 255) + ')';
            this.context.beginPath();
            this.context.rect(centers[i].x*this.scale - radius*this.scale, centers[i].y*this.scale - radius*this.scale, radius*this.scale * 2, radius*this.scale * 2);//TODO JJK Might have to add or take away some of the scaling
            this.context.closePath();
            this.context.fill();
        }
    }
};

CanvasDebugDraw._extend(b2Draw);